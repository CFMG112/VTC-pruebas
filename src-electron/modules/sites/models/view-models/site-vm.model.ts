import { Expose } from 'class-transformer';

export class SiteVm {
    @Expose()
    addressId: number;

    
    @Expose()
    addedcity: string;

    
    @Expose()
    name: string;

    
    @Expose()
    accountId: number;
}
