import { Expose } from 'class-transformer';
import { Address } from '../../../address/models/address.model';

export class SiteCreateVm {
    
    @Expose()
    address: Address;

    
    @Expose()
    addedcity: string;

    
    @Expose()
    name: string;

    
    @Expose()
    accountId: number;
}
