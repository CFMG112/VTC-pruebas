import { TransformerMaintenance } from './models/transformer-maintenace.model';

export const TRANSFORMER_MAINTENANCE_REPOSITORY = 'TRANSFORMER_MAINTENANCE_REPOSITORY';

export const transformerMaintenanceRepository = {
    provide: TRANSFORMER_MAINTENANCE_REPOSITORY,
    useValue: TransformerMaintenance,
};