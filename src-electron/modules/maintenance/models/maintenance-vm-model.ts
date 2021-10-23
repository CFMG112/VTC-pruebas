import { Expose } from 'class-transformer';

export class MaintenanceVm {
    
    
    @Expose()
    type: string;
    
    
    @Expose()
    description: string;
    
    
    @Expose()
    predefined: boolean;

    
    @Expose()
    frequency: number;
}
