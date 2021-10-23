import { Model, Table, Column, Length, ForeignKey, NotNull } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

@Table({
    modelName:"CityView",
    tableName:"CityView",
    freezeTableName:true,
    schema:"sentry"
})
export class CityView extends Model<CityView> {

    @Expose()
    @Column
    stateId: number;

    @Expose()
    @Column
    countryId: number;

    @Expose()
    @Column
    city: string;

    @Expose()
    @Column
    state: string;

    @Expose()
    @Column
    country: string;

    @Expose()
    @Column
    iso2: string;

    @Expose()
    @Column
    iso3: string;

    static get modelName(): string {
        return 'CityView';
    }
}
