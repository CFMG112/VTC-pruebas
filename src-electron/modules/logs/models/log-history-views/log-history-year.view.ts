import { Table, Column } from 'sequelize-typescript';
import { LogHistoryBase  } from './log-history-base.view';
import { Expose } from 'class-transformer';

@Table({
    modelName:"LogHistoryYearView",
    tableName:"LogHistoryYearView",
    freezeTableName:true,
    schema:"sentry",
    timestamps:false
})
export class LogHistoryYearView extends LogHistoryBase<LogHistoryYearView> {
    
    @Expose()
    @Column
    year: number;
}