import { LogGranularity } from './log-granularity.enum';
import { Expose } from 'class-transformer';
import { BaseFilter } from '../../../shared/base-filter.model';

export class LogFilter extends BaseFilter {

  
  @Expose()
  transformerId: number;

  
  @Expose()
  startDate: string;

  
  @Expose()
  endDate: string;

  
  @Expose()
  granularity: LogGranularity;

  
  @Expose()
  offset: number;

}
