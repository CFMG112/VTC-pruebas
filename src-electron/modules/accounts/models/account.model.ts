import { ReportPeriodicity } from './periodicity.enum';
import { Expose } from 'class-transformer';
import { Table, Model, Column, Length, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Address } from '../../address/models/address.model';

@Table({
  modelName:"Account",
  tableName:"Account",
  freezeTableName:true,
  schema:"sentry"
})
export class Account extends Model<Account>{

  @Expose()
  @Length({ min: 1, max: 45 })
  @Column
  name: string;

  @Expose()
  @Length({ min: 1, max: 45 })
  @Column
  company: string;

  @Expose()
  @Length({ min: 1, max: 45 })
  @Column
  sector: string;

  @Expose()
  @Column
  expirationDate: Date;

  @Expose()
  @Column
  isActive: boolean;

  @Expose()
  @Column(DataType.SMALLINT)
  periodicity: ReportPeriodicity;
  
  @ForeignKey(() => Address)
  @Column
  addressId: number;
 
  @BelongsTo(() => Address)
  address: Address;

  static get modelName(): string {
    return 'Account';
  }
}
