import { Table, Column } from 'sequelize-typescript';
import { LogHistoryBase  } from './log-history-base.view';
import { Expose } from 'class-transformer';

@Table({
    modelName:"LogHistoryDayView",
    tableName:"LogHistoryDayView",
    freezeTableName:true,
    schema:"sentry",
    timestamps:false
})
export class LogHistoryDayView extends LogHistoryBase<LogHistoryDayView> {
    
    @Expose()
    @Column
    date: Date;
}