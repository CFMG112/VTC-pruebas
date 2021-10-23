import { Log } from './log.model';
import { LogMinified } from './log-min.model';

export class LogMapper {
    static map(log: LogMinified): Log {
        return {
            jobNumber: log.job,
            oilTemperature: log.ot,
            windingTemperature: log.wt,
            ambientTemperature: log.at,
            tankPressure: log.tp,
            liquidLevel: log.ll,
            spr: log.sp,
            prd: log.pr,
            status: log.st,
        } as Log;
    }
}