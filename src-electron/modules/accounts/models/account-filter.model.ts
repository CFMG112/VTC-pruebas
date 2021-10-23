import { BaseFilter } from '../../../shared/base-filter.model';

export class AccountFilter extends BaseFilter {
  name: string;

  company: string;

  sector: string;

  expirationDate: Date;

  isActive: boolean;

  expiration: number;
}
