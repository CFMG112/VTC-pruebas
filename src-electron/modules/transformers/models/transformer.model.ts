import { Table, Model, Column, Length, ForeignKey, BelongsTo, Default, HasMany, Unique } from 'sequelize-typescript';
import { Account } from '../../accounts/models/account.model';
import { Site } from '../../sites/models/site.model';
import { Nameplate } from '../../nameplates/models/nameplate.model';
import { Expose } from 'class-transformer';
import { TransformerMaintenance } from '../../transformer-maintenances/models/transformer-maintenace.model';

@Table({
    modelName:"Transformer",
    tableName:"Transformer",
    freezeTableName:true,
    schema:"sentry"
})
export class Transformer extends Model<Transformer> {

    @Expose()
    @ForeignKey(() => Site)
    @Column
    siteId: number;

    @BelongsTo(() => Site)
    site: Site;

    @Expose()
    @ForeignKey(() => Account)
    @Column
    accountId: number;

    @BelongsTo(() => Account)
    account: Account;

    @Expose()
    @ForeignKey(() => Nameplate)
    @Column
    nameplateId: number;

    @BelongsTo(() => Nameplate)
    nameplate: Nameplate;

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    name: string;

    @Expose()
    @Length({ min: 1, max: 45 })
    @Unique
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

    @Expose()
    @HasMany(() => TransformerMaintenance)
    maintenances: TransformerMaintenance[];

    static get modelName(): string {
        return 'Transformer';
    }
}