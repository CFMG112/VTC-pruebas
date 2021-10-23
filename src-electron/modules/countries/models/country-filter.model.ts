
import { Expose } from 'class-transformer';

export class CountryFilter {

    
    @Expose()
    name: string;

    
    @Expose()
    iso: string;
}
