import { Column, Table, Length, Model } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

@Table({
    modelName:"Maintenance",
    tableName:"Maintenance",
    freezeTableName:true,
    schema:"sentry"
})
export class Maintenance extends Model<Maintenance> {
    
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
        return 'Maintenance';
    }
}
