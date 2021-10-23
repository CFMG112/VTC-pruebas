import { Column, Table, Length, Model } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

@Table({
    modelName:"MaintenanceView",
    tableName:"MaintenanceView",
    freezeTableName:true,
    schema:"sentry"
})
export class MaintenanceView extends Model<MaintenanceView> {
    
    @Expose()
    @Length({ min: 1, max: 500 })
    @Column
    description: string;

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    type: string;

    @Expose()
    @Column
    predefined: boolean;

    @Expose()
    @Column
    frequency: number;

    static get modelName(): string {
        return 'MaintenanceView';
    }
}
