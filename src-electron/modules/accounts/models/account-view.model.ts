import { ReportPeriodicity } from './periodicity.enum';
import { Expose } from 'class-transformer';
import { Table, Model, Column, Length, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Address } from '../../address/models/address.model';

@Table({
  modelName:"AccountView",
  tableName:"AccountView",
  freezeTableName:true,
  schema:"sentry"
})
export class AccountView extends Model<AccountView>{

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
    return 'AccountView';
  }
}
