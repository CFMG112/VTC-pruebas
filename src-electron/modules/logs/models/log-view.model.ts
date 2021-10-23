import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

@Table({
    modelName:"TransformerLogView",
    tableName:"TransformerLogView",
    freezeTableName:true,
    schema:"sentry",
    timestamps:false
})
export class TransformerLogView extends Model<TransformerLogView> {

    @Expose()
    @PrimaryKey
    @Column
    transformerId: number;

    @Expose()
    @Column
    jobNumber: string;

    @Expose()
    @Column
    name: string;

    @Expose()
    @Column
    accountName: string;

    @Expose()
    @Column
    accountId: number;

    @Expose()
    @Column
    siteName: string;

    @Expose()
    @Column
    siteId: string;

    @Expose()
    @Column
    tankPressure: number;

    @Expose()
    @Column
    liquidLevel: number;

    @Expose()
    @Column
    oilTemperature: number;

    @Expose()
    @Column
    windingTemperature: number;

    @Expose()
    @Column
    ambientTemperature: number;

    @Expose()
    @Column
    spr: boolean;

    @Expose()
    @Column
    prd: boolean;

    @Expose()
    @Column
    status: number;

    @Expose()
    @Column
    createdAt: Date;

    static get modelName(): string {
        return 'TransformerLogView';
    }
    
}