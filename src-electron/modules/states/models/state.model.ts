import { Model, Column, Length, Table, ForeignKey } from 'sequelize-typescript';
import { Expose } from 'class-transformer';
import { Country } from '../../countries/models/country.model';

@Table({
    modelName:"State",
    tableName:"State",
    freezeTableName:true,
    schema:"sentry"
})
export class State extends Model<State> {

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    state: string;

    @Expose()
    @ForeignKey(() => Country)
    @Column
    countryId: number;

    static get modelName(): string {
        return 'State';
    }
}