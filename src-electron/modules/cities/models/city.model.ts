import { Model, Table, Column, Length, ForeignKey, NotNull } from 'sequelize-typescript';
import { Expose } from 'class-transformer';
import { State } from '../../states/models/state.model';
import { Country } from '../../countries/models/country.model';

@Table({
    modelName:"City",
    tableName:"City",
    freezeTableName:true,
    schema:"sentry"
})
export class City extends Model<City> {

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    city: string;

    @Expose()
    @ForeignKey(() => State)
    @Column
    stateId: number;

    @Expose()
    @ForeignKey(() => Country)
    @Column
    countryId: number;

    static get modelName(): string {
        return 'City';
    }
}
