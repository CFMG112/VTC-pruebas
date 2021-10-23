import { Column, Model, PrimaryKey } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

export class LogHistoryBase<T> extends Model<T> {

    @Expose()
    @PrimaryKey
    @Column
    transformerId: number;

    @Expose()
    @Column
    ambientTemperature: number;

    @Expose()
    @Column
    liquidLevel: number;

    @Expose()
    @Column
    oilTemperature: number;

    @Expose()
    @Column
    tankPressure: number;

    @Expose()
    @Column
    windingTemperature: number;
}