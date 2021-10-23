import { Log } from './models/log.model';
import { TransformerLogView } from './models/log-view.model';
import { LogHistoryDayView } from './models/log-history-views/log-history-day.view';
import { LogHistoryMinuteView } from './models/log-history-views/log-history-minute.view';
import { LogHistoryHourView } from './models/log-history-views/log-history-hour.view';
import { LogHistoryMonthView } from './models/log-history-views/log-history-month.view';
import { LogHistoryYearView } from './models/log-history-views/log-history-year.view';
import { LogHistoryWeekView } from './models/log-history-views/log-history-week.view';
import { LogView } from './models/log-summary-view.model';

export const LOGS_REPOSITORY = 'LOGS_REPOSITORY';
export const LOGS_VIEW_REPOSITORY = 'LOGS_VIEW_REPOSITORY';
export const LOG_HISTORY_DAY_REPOSITORY = 'LOG_HISTORY_DAY_REPOSITORY';
export const LOG_HISTORY_MINUTE_REPOSITORY = 'LOG_HISTORY_MINUTE_REPOSITORY';
export const LOG_HISTORY_HOUR_REPOSITORY = 'LOG_HISTORY_HOUR_REPOSITORY';
export const LOG_HISTORY_MONTH_REPOSITORY = 'LOG_HISTORY_MONTH_REPOSITORY';
export const LOG_HISTORY_YEAR_REPOSITORY = 'LOG_HISTORY_YEAR_REPOSITORY';
export const LOG_HISTORY_WEEK_REPOSITORY = 'LOG_HISTORY_WEEK_REPOSITORY';
export const LOG_SUMMARY_VIEW = 'LOG_SUMMARY_VIEW';

export const logsRepository = {
    provide: LOGS_REPOSITORY,
    useValue: Log,
};

export const logsViewRepository = {
    provide: LOGS_VIEW_REPOSITORY,
    useValue: TransformerLogView,
};

export const logHistoryMinuteRepository = {
    provide: LOG_HISTORY_MINUTE_REPOSITORY,
    useValue: LogHistoryMinuteView
};

export const logHistoryHourRepository = {
    provide: LOG_HISTORY_HOUR_REPOSITORY,
    useValue: LogHistoryHourView
};

export const logHistoryDayRepository = {
    provide: LOG_HISTORY_DAY_REPOSITORY,
    useValue: LogHistoryDayView
};

export const logHistoryMonthRepository = {
    provide: LOG_HISTORY_MONTH_REPOSITORY,
    useValue: LogHistoryMonthView
};

export const logHistoryYearRepository = {
    provide: LOG_HISTORY_YEAR_REPOSITORY,
    useValue: LogHistoryYearView
};

export const logHistoryWeekRepository = {
    provide: LOG_HISTORY_WEEK_REPOSITORY,
    useValue: LogHistoryWeekView
};

export const logSummaryViewRepository = {
    provide: LOG_SUMMARY_VIEW,
    useValue: LogView
};