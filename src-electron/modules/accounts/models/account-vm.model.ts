import { ReportPeriodicity } from './periodicity.enum';
import { Expose } from 'class-transformer';
import { Address } from '../../address/models/address.model';

export class AccountVm {
  @Expose()
  name: string;

  
  @Expose()
  company: string;

  
  @Expose()
  sector: string;

  
  @Expose()
  expirationDate: Date;

  
  @Expose()
  isActive: boolean;

  
  @Expose()
  periodicity: ReportPeriodicity;

  
  @Expose()
  addressId: number;

  
  @Expose()
  address: Address;
}
