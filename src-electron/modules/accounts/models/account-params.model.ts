import { Address } from '../../address/models/address.model';

export class AccountParams {
  name: string;

  company: string;

  sector: string;

  address: Address;

  expirationDate: Date;

  isActive: boolean;
}