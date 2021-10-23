import { Injectable, InternalServerErrorException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { TransformerService } from '../transformers/transformers.service';
import { Log } from './models/log.model';
import { TransformerLogView } from './models/log-view.model';
import { LogView } from './models/log-summary-view.model';
import { LogStatus } from './models/log-status.enum';
import { getStatus } from './logs.utils';
import { Logger } from '@nestjs/common';
import {
  LOGS_REPOSITORY,
  LOGS_VIEW_REPOSITORY,
  LOG_SUMMARY_VIEW
} from './logs.providers'
import { Op, CountOptions, Sequelize, where } from 'sequelize';
import { TransformerFilter } from '../transformers/models/transformer-filter.model';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class LogService {

  constructor(
    @Inject(LOGS_REPOSITORY) private readonly logRepository: typeof Log,
    @Inject(LOGS_VIEW_REPOSITORY) private readonly transformerLogRepository: typeof TransformerLogView,
    @Inject(LOG_SUMMARY_VIEW) private readonly logSummaryView: typeof LogView,
    @Inject(forwardRef(() => TransformerService)) private readonly _transformerService: TransformerService,
  ) { }

  async create(params: Log): Promise<Log> {
    return this.logRepository.create(params);
  }

  async findAll(params?: any): Promise<Log[]> {
    const { filter, limit, sort, skip } = params;
    return this.logRepository.findAll({
      where: filter,
      limit,
      offset: skip,
      order: sort
    });
  }

  async findOne(filter: any): Promise<Log> {
    return this.logRepository.findOne({
      where: {
        transformerId: filter
      }
    });
  }

  async findById(id: number): Promise<Log> {
    return this.logRepository.findByPk(id);
  }

  async delete(id: number): Promise<Log> {
    const removed = await this.findById(id);
    await this.logRepository.destroy({
      where: {
        id
      }
    });
    return removed;
  }

  async update(id: number, item: any): Promise<Log> {
    await this.logRepository.update(item, {
      where: {
        id: id
      }
    });
    return this.findById(id);
  }


  async createLog(params: Log): Promise<Log> {

    const { jobNumber, oilTemperature, windingTemperature,
      ambientTemperature, tankPressure, liquidLevel,
      spr, prd } = params;

    let transformer;

    try {
      transformer = await this._transformerService.findOne({
        'jobNumber': jobNumber
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    if (!transformer) {
      throw new HttpException(`${jobNumber} Not found`, HttpStatus.NOT_FOUND);
    }

    const newLog = {
      transformerId: transformer.id,
      oilTemperature: +oilTemperature,
      windingTemperature: +windingTemperature,
      ambientTemperature: +ambientTemperature,
      tankPressure: +tankPressure,
      liquidLevel: +liquidLevel,
      spr: +spr,
      prd: +prd,
      status: getStatus(params, transformer),
    } as Log;

    if (newLog.status == LogStatus.Danger) {
      Logger.debug("ALERT Critical levels for JobNumber " + jobNumber, "LogService");
    }

    try {
      const result = await this.create(newLog);
      return result.toJSON() as Log;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }


  async getLogSummary(accountId: number, startDate: Date, endDate: Date) {
    const where = {
      createdAt: {
        [Op.gte]: startDate,
        [Op.lte]: endDate
      },
      accountId
    };

    const summary = await this.logSummaryView.findAll({
      where,
      attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']],
      group: 'status',
      raw: true
    }) as any;

    return summary.reduce((accumulated: any, current: any) => {
      const { status, count } = current;
      return {
        [`${status}`]: count,
        ...accumulated
      }
    }, {});
  }


  async findAllByTransformerId(id: number, startDate: Date, endDate: Date) {
    const sort = [
      ['createdAt', 'DESC']
    ];
    const filter = {
      transformerId: id,
      status: {
        [Op.ne]: 3
      },
      createdAt: {
        [Op.gte]: startDate,
        [Op.lte]: endDate
      }
    };

    try {
      return await this.findAll({ filter, sort })
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  async updateLog(params: any): Promise<Log> {
    const { id } = params;

    if (!id) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const exist = await this.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }

    try {
      const result = await this.update(id, params);
      return result.toJSON() as Log;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findTransformerLogs(params: TransformerFilter): Promise<any> {
    const { id, accountId, siteId, status, jobNumber, name } = params;
    const filter = {};

    if (id) {
      filter['transformerId'] = id;
    }
    if (accountId) {
      filter['accountId'] = accountId;
    }
    if (siteId) {
      filter['siteId'] = siteId;
    }
    if (status) {
      filter['status'] = +status;
    }
    if (jobNumber) {
      filter['jobNumber'] = {
        [Op.like]: `%${jobNumber}%`
      }
    }
    if (name) {
      filter['name'] = {
        [Op.like]: `%${name}%`
      }
    }

    try {
      const transformers = await this.transformerLogRepository.findAll({
        where: filter
      });
      return {
        total: transformers.length,
        data: transformers
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  async findTransformerLastLogs(params): Promise<any> {
    const { id, jobNumber, status, name, siteId } = params;


    let atts = [];
    let response = [];

    if (id) {
      atts.push({ id });
    }

    if (name) {
      atts.push({
        name: {
          [Op.like]: `%${name}%`
        }
      });
    }

    if (jobNumber) {
      atts.push({
        jobNumber: {
          [Op.like]: `%${jobNumber}%`
        }
      });
    }

    const filter = {
      [Op.or]: atts
    } as any;

    try {
      if (atts.length == 0) {
        delete filter[Op.or];
      }

      const transformers = await this._transformerService.findAll({ filter })

      for (let i = 0; i < transformers.length; i++) {
        let lastLog = await this.findOneLog(transformers[i], status);

        if (lastLog != null) {
          let resTransformer = {
            ...transformers[i], windingTemperature: lastLog.windingTemperature,
            ambientTemperature: lastLog.ambientTemperature,
            tankPressure: lastLog.tankPressure,
            liquidLevel: lastLog.liquidLevel,
            logCreatedAt: lastLog.createdAt,
            spr: lastLog.spr,
            prd: lastLog.prd,
            status: lastLog.status,
            oilTemperature: lastLog.oilTemperature
          }

          if (!siteId) {
            response.push(resTransformer)
          } else {
            transformers[i].siteId === siteId ? response.push(resTransformer) : null
          }


        }else{
          let resTransformer = {
            ...transformers[i], windingTemperature: 0,
            ambientTemperature: null,
            tankPressure: null,
            liquidLevel: null,
            logCreatedAt: null,
            spr: null,
            prd: null,
            status: null,
            oilTemperature: null
          }

          if (!siteId) {
            response.push(resTransformer)
          } else {
            transformers[i].siteId === siteId ? response.push(resTransformer) : null
          }
        }

      }

      return {
        total: response.length,
        data: response
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  async findOneLog(transformer, status): Promise<Log> {

    const res = await this.logRepository.findOne({
      where: { transformerId: transformer.id },
      raw: true,
      order: [['createdAt', 'DESC']]
    });
    if (!status) {
      return res
    } else {
      return res.status === status ? res : null
    }

  }

  async deleteTransformerLogs(transformerId: number) {
    const where = { transformerId };
    const count = await this.logRepository.count({ where });
    await this.logRepository.destroy({
      where
    })

    return count;
  }

  async deleteObsoleteHistory(params) {
    const where = {
      createdAt: {
        [Op.lte]: params
      }
    }
    await this.logRepository.destroy({ where });
    Logger.log("One month deleted", "HistoryService")

  }

}



