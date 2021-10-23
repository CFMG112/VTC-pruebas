import { BaseFilter } from '../../../shared/base-filter.model';
import { Expose } from 'class-transformer';

export class MaintenanceFilter extends BaseFilter {

    
    @Expose()
    type: string;

    
    @Expose()
    description: string;

    
    @Expose()
    filterByPredefined: boolean;

    
    @Expose()
    predefined: boolean;

}
