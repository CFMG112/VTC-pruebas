import { Injectable, Inject } from '@nestjs/common';

import { Log } from './models/log.model';

import {
    LOGS_REPOSITORY,
} from './logs.providers'
import { Op, fn, col, literal, CountOptions, Sequelize } from 'sequelize';

import { LogFilter } from './models/log-filter.model';
import { LogGranularity } from './models/log-granularity.enum';


@Injectable()
export class LogHistoryService {
    constructor(
        @Inject(LOGS_REPOSITORY) private readonly logRepository: typeof Log
    ) { }

    async findLogHistory(params: LogFilter) {
        params = this.normalizeFilterDatatypes(params);
        let { offset, transformerId, startDate, endDate, granularity } = params;
        const where = {
            transformerId,
            createdAt: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        }

        // Agregated columns sequelize definitions
        const strOffset = this.normalizeOffset(offset);
        const createdAtOffsetFn = fn('datetime', col('createdAt'), strOffset);
        // This aditional CONVERT makes sure node receives the date as string
        // and so it doesn't try to convert it to local date (day offset issue)
        const dateStrFn = fn('strftime', '%Y-%m-%d', createdAtOffsetFn);
        const yearFn = fn('strftime', '%Y', createdAtOffsetFn);
        const monthFn = fn('strftime', '%m', createdAtOffsetFn);
        const weekFn = fn('strftime', '%W', createdAtOffsetFn);
        const hourFn = fn('strftime', '%H', createdAtOffsetFn);
        const minuteFn = fn('strftime', '%M', createdAtOffsetFn);

        const queryAttributes = [];
        const groupBy = [];
        const orderBy = [];
        // Cascade switch is completely intented do not add
        // Do NOT add aditional breaks
        switch (granularity) {

            case LogGranularity.All:
            case LogGranularity.Minute:
                queryAttributes.push([minuteFn, 'minute']);
                groupBy.push(minuteFn);
                orderBy.unshift([minuteFn, 'ASC'])
            case LogGranularity.Hour:
                queryAttributes.push([hourFn, 'hour']);
                groupBy.push(hourFn);
                orderBy.unshift([hourFn, 'ASC'])
            case LogGranularity.Day:
                queryAttributes.push([ dateStrFn, 'date']);
                groupBy.push(dateStrFn);
                orderBy.unshift([dateStrFn, 'ASC']);
                break;

            case LogGranularity.Week:
                queryAttributes.push([weekFn, 'week']);
                groupBy.push(weekFn);
                orderBy.unshift([weekFn, 'ASC']);
            case LogGranularity.Month:
                queryAttributes.push([monthFn, 'month']);
                groupBy.push(monthFn);
                orderBy.unshift([monthFn, 'ASC']);
            case LogGranularity.Year:
                queryAttributes.push([yearFn, 'year']);
                groupBy.push(yearFn);
                orderBy.unshift([yearFn, 'ASC']);
        }

        const history = await this.logRepository.findAll({
            where,
            raw: true,
            attributes: [
                ...queryAttributes,
                // Query independent attributes
                'transformerId',
                [fn('AVG', col('ambientTemperature')), 'ambientTemperature'],
                [fn('AVG', col('liquidLevel')), 'liquidLevel'],
                [fn('AVG', col('oilTemperature')), 'oilTemperature'],
                [fn('AVG', col('tankPressure')), 'tankPressure'],
                [fn('AVG', col('windingTemperature')), 'windingTemperature']
            ],
            order: orderBy,
            group: [...groupBy, 'transformerId']
        });

        const normalizedHistory = this.normalizeLogsDataTypes(history);
        return {
            total: normalizedHistory.length,
            data: normalizedHistory
        }
    }

    private normalizeFilterDatatypes(filter: LogFilter) {
        let { startDate, endDate, offset, granularity, transformerId } = filter;
        startDate = startDate
        endDate = endDate
        granularity = +granularity;
        offset = +offset;
        transformerId = +transformerId
        return { ...filter, startDate, endDate, granularity, offset };
    }

    private normalizeLogsDataTypes(logs: any[]) {
        return logs.map(
            log => ({
                ...log,
                minute: +log.minute,
                hour: +log.hour,
                week: +log.week,
                month: +log.month,
                year: +log.year,
            })
        )
    }

    private normalizeOffset(offset: number): string {
        const hours = offset < 0 ? `${offset}` : `+${offset}`;
        return `${hours} hours`;
    }

}
