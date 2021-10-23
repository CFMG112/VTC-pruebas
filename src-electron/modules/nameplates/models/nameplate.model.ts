import { Expose } from 'class-transformer';
import { Table, Column, Length, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({
    modelName:"Nameplate",
    tableName:"Nameplate",
    freezeTableName:true,
    schema:"sentry"
})
export class Nameplate extends Model<Nameplate> {

    @Expose()
    @Column
    mva: string;

    @Expose()
    @Column
    hvConnection: string;
    
    @Expose()
    @Column
    hvVolts: string;

    @Expose()
    @Column
    lvConnection: string;
    
    @Expose()
    @Column
    lvVolts: string;

    @Expose()
    @Column
    lv2Connection: string;
    
    @Expose()
    @Column
    lv2Volts: string;

    @Expose()
    @Column
    tvConnection: string;
    
    @Expose()
    @Column
    tvVolts: string;
    
    @Expose()
    @Column
    temperatureRise: string;

    @Expose()
    @Column
    coolingClass: string;

    @Expose()
    @Column
    impedance: string;

    @Expose()
    @Column
    application: string;

    @Expose()
    @Column
    manifactureDate: string;
    
    static get modelName(): string {
        return 'Nameplate';
    }
}
