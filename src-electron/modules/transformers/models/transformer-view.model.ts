import { Table, Model, Column, Length, ForeignKey, BelongsTo, Default, HasMany } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

@Table({
    modelName:"TransformerView",
    tableName:"TransformerView",
    freezeTableName:true,
    schema:"sentry"
})
export class TransformerView extends Model<TransformerView> {

    @Expose()
    @Column
    siteId: number;

    @Expose()
    @Column
    accountId: number;

    @Expose()
    @Column
    nameplateId: number;

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    name: string;

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    jobNumber: string;

    @Expose()
    @Column
    type: string;

    @Expose()
    @Column
    class: string;

    @Expose()
    @Column
    gatewayDeviceId: string;

    @Expose()
    @Column
    commissioningDate: Date;

    @Expose()
    @Column
    shippingDate: Date;

    @Expose()
    @Column
    updatedAt: Date;

    @Expose()
    @Length({ min: 1, max: 255 })
    @Column
    accountName: string;

    @Expose()
    @Length({ min: 1, max: 250 })
    @Column
    siteName: string;

    @Expose()
    @Column
    createdAt: Date;

    @Expose()
    @Default(-50)
    @Column
    oilTemperatureLimitsMin: number;

    @Expose()
    @Default(200)
    @Column
    oilTemperatureLimitsMax: number;
    
    @Expose()
    @Default(-50)
    @Column
    windingTemperatureLimitsMin: number;

    @Expose()
    @Default(300)
    @Column
    windingTemperatureLimitsMax: number;

    @Expose()
    @Default(-50)
    @Column
    ambientTemperatureLimitsMin: number;

    @Expose()
    @Default(200)
    @Column
    ambientTemperatureLimitsMax: number;

    @Expose()
    @Default(-14.7)
    @Column
    tankPressureLimitsMin: number;

    @Expose()
    @Default(15)
    @Column
    tankPressureLimitsMax: number;

    @Expose()
    @Default(0)
    @Column
    liquidLevelLimitsMin: number;

    @Expose()
    @Default(200)
    @Column
    liquidLevelLimitsMax: number;


    static get modelName(): string {
        return 'TransformerView';
    }
}