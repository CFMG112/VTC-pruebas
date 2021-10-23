import { Expose } from 'class-transformer';

export class BaseFilter {
    @Expose()
    id: number;
  
    @Expose()
    limit?: number;

    @Expose()
    skip?: number;
}