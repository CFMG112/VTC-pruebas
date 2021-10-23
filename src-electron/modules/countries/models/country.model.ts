import { Model, Column, Length, Table } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

@Table({
    modelName:"Country",
    tableName:"Country",
    freezeTableName:true,
    schema:"sentry"
})
export class Country extends Model<Country> {

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    country: string;

    @Expose()
    @Column
    iso2: string;

    @Expose()
    @Column
    iso3: string;

    static get modelName(): string {
        return 'Country';
    }
}