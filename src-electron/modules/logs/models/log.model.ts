import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Expose } from 'class-transformer';
import { Transformer } from '../../transformers/models/transformer.model';

@Table({
    modelName: "Log",
    tableName: "Log",
    freezeTableName: true,
    schema: "sentry"
})
export class Log extends Model<Log> {


    @Expose()
    @Column
    @ForeignKey(() => Transformer)
    transformerId: number;

    @BelongsTo(() => Transformer)
    transformer: Transformer;

    @Expose()
    jobNumber: string;

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
    tankPressure: number;

    @Expose()
    @Column
    liquidLevel: number;

    @Expose()
    @Column
    spr: number;

    @Expose()
    @Column
    prd: number;

    @Expose()
    @Column
    status: number;

    static get modelName(): string {
        return 'Log';
    }

}
