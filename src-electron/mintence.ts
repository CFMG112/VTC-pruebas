
import { existsSync, mkdirSync } from 'fs';
import { LogService } from './modules/logs/logs.service';
import { Logger, INestApplicationContext } from '@nestjs/common';

export class Maintence {

    private _service: LogService

    constructor(app: INestApplicationContext) {
        this._service = app.get(LogService);

    }

    init() {
        Logger.log("init", "Maintence");

        //delete all logs of the previous month 
        this._service.deleteObsoleteHistory(this.sumRestDays(new Date(), -30))



    }


    sumRestDays(date, days) {
        date.setDate(date.getDate() + days);
        return date;
    }



}
