
import { BaseFilter } from '../../../shared/base-filter.model';
import { Expose } from 'class-transformer';

export class TransformerFilter extends BaseFilter {

  
  @Expose()
  name: string;

  
  @Expose()
  type: string;

  
  @Expose()
  jobNumber: string;

  
  @Expose()
  status: number;

  
  @Expose()
  class: string;

  
  @Expose()
  siteId: number;

  
  @Expose()
  accountId: number;

  createdAfter: Date;
  
  createdBefore: Date;
}
