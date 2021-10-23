import { Expose } from 'class-transformer';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    modelName:"AddressView",
    tableName:"AddressView",
    freezeTableName:true
})
export class AddressView extends Model<AddressView> {

    @Expose()
    @Column
    address: string;
    
    @Expose()
    @Column
    cityId: number;

    @Expose()
    @Column
    stateId: number;

    @Expose()
    @Column
    contryId: number;

    @Expose()
    @Column
    city: string;

    @Expose()
    @Column
    state: string;

    @Expose()
    @Column
    country: string;

    static get modelName(): string {
        return 'AddressView';
    }
}
