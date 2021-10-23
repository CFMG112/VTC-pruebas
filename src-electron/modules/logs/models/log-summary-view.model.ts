import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

@Table({
    modelName:"LogView",
    tableName:"LogView",
    freezeTableName:true,
    schema:"sentry",
    timestamps:false
})
export class LogView extends Model<LogView> {

    @Expose()
    @Column
    status: number;

    @Expose()
    @PrimaryKey
    @Column
    accountId: number;

    @Expose()
    @Column
    createdAt: Date;

    static get modelName(): string {
        return 'LogView';
    }
    
}