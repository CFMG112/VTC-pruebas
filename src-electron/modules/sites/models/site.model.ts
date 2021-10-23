import { Column, Table, Model, Length, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Address } from '../../address/models/address.model';
import { Account } from '../../accounts/models/account.model';
import { Expose } from 'class-transformer';

@Table({
  modelName:"Site",
  tableName:"Site",
  freezeTableName:true,
  schema:"sentry"
})
export class Site extends Model<Site> {
  
  @Expose()
  @Length({ min: 1, max: 45 })
  @Column
  name: string;

  @Expose()
  @ForeignKey(() => Address)
  @Column
  addressId: number;

  @BelongsTo(() => Address)
  address: Address;

  @Expose()
  @ForeignKey(() => Account)
  @Column
  accountId: number;

  @Expose()
  @Column
  addedcity: string;

  static get modelName(): string {
    return 'Site';
  }
}
