
import { Expose } from 'class-transformer';

export class CityFilter {

    
    @Expose()
    name: string;

    
    @Expose()
    iso: string;
}
