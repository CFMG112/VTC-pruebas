import {
  Injectable,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
  Logger,
  Inject
} from '@nestjs/common';
import { Transformer } from './models/transformer.model';
import { Site } from '../sites/models/site.model';
import { TransformerResponseVm } from './models/transformer-response-vm.model';
import { TransformerFilter } from './models/transformer-filter.model';
import { TransformerLimits } from './models/transformer-limits.model';
import { TRANSFORMER_REPOSITORY, TRANSFORMER_VIEW_REPOSITORY } from './transformers.providers';
import { Op } from 'sequelize';
import { TransformerMaintenanceService } from '../transformer-maintenances/transformer-maintenances.service';
import { NameplatesService } from '../nameplates/nameplates.service';
import { Nameplate } from '../nameplates/models/nameplate.model';
import { LogService } from '../logs/logs.service';
import { AnyNsRecord } from 'dns';

@Injectable()
export class TransformerService {

  constructor(
    private readonly maintenancesService: TransformerMaintenanceService,
    private readonly nameplateService: NameplatesService,
    private readonly logsService: LogService,
    @Inject(TRANSFORMER_REPOSITORY) private readonly transformerRepository: typeof Transformer,

  ) { }

  async create(params: Transformer): Promise<Transformer> {
    return this.transformerRepository.create(params);
  }

  async findAll(params?: any): Promise<Transformer[]> {
    const { filter, limit, sort, skip } = params;
    return this.transformerRepository.findAll({
      where: filter,
      limit,
      offset: skip,
      order: sort,
      raw: true,
      include: [
        Site
      ]
    });
  }

  async findOne(filter = {}): Promise<Transformer> {
    return this.transformerRepository.findOne({
      where: filter,
      raw: true
    });
  }

  async count(filter = {}): Promise<number> {
    return this.transformerRepository.count(filter);
  }

  async findById(id: number): Promise<Transformer> {
    return this.transformerRepository.findByPk(id, {
      // raw: true,
      include: [
        Site,
        Nameplate
      ]
    });
  }

  async delete(id: number): Promise<any> {
    await this.logsService.deleteTransformerLogs(id);
    await this.maintenancesService.deleteMaintanances(id);
    const removed = await this.findById(id);
    await this.transformerRepository.destroy({
      where: {
        id
      }
    });
    return {removed:"okay"};
  }

  async update(id: number, item: any): Promise<Transformer> {
    await this.transformerRepository.update(item, {
      where: {
        id: id
      }
    });
    return this.findById(id);
  }


  async createTransformer(params: Transformer): Promise<any> {
    console.log(`1 one`);
    try {
      const exist = await this.findOne({ jobNumber: params.jobNumber })
      console.log(`2 two`);
      if (exist) {
        throw new HttpException('JobNumber Already exsist', HttpStatus.BAD_REQUEST);
      }

      await this.createOrUpdateNameplate(params);
      console.log(`3`);
      const result = await this.create(params);


      console.log(`4`);
      const maintenances = params.maintenances;
      await this.maintenancesService.updateMaintenances({

        id: result.id, maintenances
      });
      console.log(`5`);
      return {result:"okay"};

    } catch (e) {
      console.log(`Error ${e}`);
      throw new InternalServerErrorException(e);
    }
  }

  private async createOrUpdateNameplate(transformer: Transformer) {
    const nameplate = transformer.nameplate;
    if (transformer.nameplateId) {
      const id = transformer.nameplateId;
      await this.nameplateService.update(id, nameplate);
    } else {
      const saved = await this.nameplateService.create(nameplate);
      transformer.nameplateId = saved.id;

    }
  }

  async updateTransformer(params: any): Promise<any> {
    const { id } = params;

    if (!id) {
      Logger.log(id, 'no id')
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const exist = await this.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }

    try {
      await this.createOrUpdateNameplate(params);
      const result = await this.update(id, params);
      const maintenances = params.maintenances;
      await this.maintenancesService.updateMaintenances({
        id: result.id, maintenances
      });
      return {result:"okay"};
    } catch (e) {
      Logger.log(e)
      throw new InternalServerErrorException(e);
    }
  }

  async findByAccountId(accountId: number): Promise<Transformer[]> {
    try {
      const filter = {
        accountId
      };
      return await this.findAll({ filter });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findByFilter(params: TransformerFilter): Promise<TransformerResponseVm> {
    let { id, name, type, jobNumber, siteId, accountId, skip, limit } = params as any;
    let atts = [];

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

    if (type) {
      atts.push({
        type: {
          [Op.like]: `%${type}%`
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

    if (params['class']) {
      atts.push({
        'class': {
          [Op.like]: `%${params['class']}%`
        }
      });
    }

    if (siteId) {
      atts.push({ siteId });
    }

    const filter = {
      [Op.or]: atts
    } as any;

    try {

      if (accountId) {
        filter.accountId = accountId;
      }
      if (atts.length == 0) {
        delete filter[Op.or];
      }

      let raw_data = await this.findAll({ filter, limit, skip });
      let transformers = raw_data.map(transformer => ({
        siteName: transformer['site.name'],
        ...transformer
      }));

      return {
        total: transformers.length,
        data: transformers,
      };
    } catch (e) {
      Logger.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  async updateTransformerLimits(limits: TransformerLimits): Promise<Transformer> {
    const { jobNumber } = limits;
    let transformer: Transformer;

    try {
      transformer = await this.findOne({
        'jobNumber': jobNumber
      });
    } catch (e) {
      Logger.log("Error when findOne", "TransformersService:updateTransformerList");
      throw new InternalServerErrorException(e);
    }

    if (!transformer) {
      Logger.log("Transformer not found", "TransformersService:updateTransformerList");
      throw new HttpException(`${jobNumber} Not found`, HttpStatus.NOT_FOUND);
    }

    try {
      // Overrides the previous limit values
      Object.assign(transformer, limits);
      Logger.log(transformer, "TransformersService:updateTransformerLimits");

      const result = await this.update(transformer.id, transformer);
      Logger.log(">>> Transformer updated", "TransformersService:updateTransformerList");

      return result as Transformer;

    } catch (e) {
      Logger.log("Error when updating model", "TransformersService:updateTransformerList");
      throw new InternalServerErrorException(e);
    }
  }

}
