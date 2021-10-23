import { Table, Column } from 'sequelize-typescript';
import { LogHistoryBase  } from './log-history-base.view';
import { Expose } from 'class-transformer';

@Table({
    modelName:"LogHistoryHourView",
    tableName:"LogHistoryHourView",
    freezeTableName:true,
    schema:"sentry",
    timestamps:false
})
export class LogHistoryHourView extends LogHistoryBase<LogHistoryHourView> {
    
    @Expose()
    @Column
    date: Date;
    
    @Expose()
    @Column
    hour: number;
}