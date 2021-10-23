import { HttpModule, Module } from '@nestjs/common';
import { LogService } from './logs.service';
import { TransformerModule } from '../transformers/transformers.module';
import {
  logsRepository,
  logsViewRepository,
  logHistoryDayRepository,
  logHistoryHourRepository,
  logHistoryMinuteRepository,
  logHistoryMonthRepository,
  logHistoryYearRepository,
  logHistoryWeekRepository,
  logSummaryViewRepository
} from './logs.providers';
import { LogHistoryService } from './log-history.service';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    HttpModule,
    forwardRef(() =>TransformerModule)
  ],
  controllers: [],
  providers: [
    logsRepository,
    logsViewRepository,
    logHistoryDayRepository,
    logHistoryHourRepository,
    logHistoryMinuteRepository,
    logHistoryMonthRepository,
    logHistoryYearRepository,
    logHistoryWeekRepository,
    logSummaryViewRepository,
    LogService,
    LogHistoryService
  ],
  exports: [LogService],
})
export class LogModule { }
