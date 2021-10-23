import { Table, Column } from 'sequelize-typescript';
import { LogHistoryBase  } from './log-history-base.view';
import { Expose } from 'class-transformer';

@Table({
    modelName:"LogHistoryMonthView",
    tableName:"LogHistoryMonthView",
    freezeTableName:true,
    schema:"sentry",
    timestamps:false
})
export class LogHistoryMonthView extends LogHistoryBase<LogHistoryMonthView> {
    
    @Expose()
    @Column
    year: number;

    @Expose()
    @Column
    month: number;
}