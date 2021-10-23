import { Expose } from 'class-transformer';
import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Transformer } from '../../transformers/models/transformer.model';
import { Maintenance } from '../../maintenance/models/maintenance.model';

@Table({
    modelName:"TransformerMaintenance",
    tableName:"TransformerMaintenance",
    freezeTableName:true,
    schema:"sentry"
})
export class TransformerMaintenance extends Model<TransformerMaintenance> {

    @Expose()
    @Column
    expirationDate: Date;

    @Expose()
    @Column
    status: boolean;
    
    @Expose()
    @ForeignKey(() => Maintenance)
    @Column
    maintenanceId: number;

    @BelongsTo(() => Maintenance)
    maintenance: Maintenance;

    @Expose()
    @ForeignKey(() => Transformer)
    @Column
    transformerId: number;

    @BelongsTo(() => Transformer)
    transformer: Transformer;

    static get modelName(): string {
        return 'TransformerMaintenance';
    }
}
