import { Table, Column } from 'sequelize-typescript';
import { LogHistoryBase  } from './log-history-base.view';
import { Expose } from 'class-transformer';

@Table({
    modelName:"LogHistoryWeekView",
    tableName:"LogHistoryWeekView",
    freezeTableName:true,
    schema:"sentry",
    timestamps:false
})
export class LogHistoryWeekView extends LogHistoryBase<LogHistoryWeekView> {
    
    @Expose()
    @Column
    year: number;

    @Expose()
    @Column
    month: number;

    @Expose()
    @Column
    week: number;
}