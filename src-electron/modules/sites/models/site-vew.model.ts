import { Column, Table, Model, Length } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

@Table({
    modelName: "SiteView",
    tableName: "SiteView",
    freezeTableName: true,
    schema: "sentry"
})
export class SiteView extends Model<SiteView> {

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    name: string;

    @Expose()
    @Column
    addressId: number;

    @Expose()
    @Column
    address: number;

    @Expose()
    @Column
    accountId: number;

    @Expose()
    @Column
    addedcity: string;

    @Expose()
    @Column
    createdAt: string;

    @Expose()
    @Column
    updatedAt: string;

    @Expose()
    @Column
    country: string;

    @Expose()
    @Column
    state: string;

    @Expose()
    @Column
    city: string;

    static get modelName(): string {
        return 'SiteView';
    }
}
