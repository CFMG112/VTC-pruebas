import { Expose } from 'class-transformer';
import { Table, Column, Length, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { City } from '../../cities/models/city.model';
import { State } from '../../states/models/state.model';
import { Country } from '../../countries/models/country.model';

@Table({
    modelName:"Address",
    tableName:"Address",
    freezeTableName:true,
    schema:"sentry"
})
export class Address extends Model<Address> {

    @Expose()
    @Length({ min: 1, max: 250 })
    @Column
    address: string;
    
    @Expose()
    @ForeignKey(() => City)
    @Column
    cityId: number;

    @BelongsTo(() => City)
    city: City;

    @Expose()
    @ForeignKey(() => State)
    @Column
    stateId: number;

    @BelongsTo(() => State)
    state: State;

    @Expose()
    @ForeignKey(() => Country)
    @Column
    countryId: number;

    @BelongsTo(() => Country)
    country: Country;

    static get modelName(): string {
        return 'Address';
    }
}
