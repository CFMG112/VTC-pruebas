import { Table, Column } from 'sequelize-typescript';
import { LogHistoryBase  } from './log-history-base.view';
import { Expose } from 'class-transformer';

@Table({
    modelName:"LogHistoryMinuteView",
    tableName:"LogHistoryMinuteView",
    freezeTableName:true,
    schema:"sentry",
    timestamps:false
})
export class LogHistoryMinuteView extends LogHistoryBase<LogHistoryMinuteView> {
    
    @Expose()
    @Column
    date: Date;
    
    @Expose()
    @Column
    hour: number;

    @Expose()
    @Column
    minute: number;
}