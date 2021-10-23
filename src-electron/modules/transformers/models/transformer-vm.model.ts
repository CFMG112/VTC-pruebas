import { Expose } from 'class-transformer';
import { Nameplate } from '../../nameplates/models/nameplate.model';

export class TransformerVm {
    
    @Expose()
    accountId: number;

    
    @Expose()
    name: string;

    
    @Expose()
    type: string;

    
    @Expose()
    class: string;

    
    @Expose()
    jobNumber: string;

    
    @Expose()
    siteId: number;

    
    @Expose()
    gatewayDeviceId: string;

    
    @Expose()
    commissioningDate: Date;

    
    @Expose()
    shippingDate: Date;

    
    @Expose()
    nameplate: Nameplate;
}
