import { Maintenance } from './models/maintenance.model';
import { MaintenanceView } from './models/maintenance-view.model';

export const MAINTENANCE_REPOSITORY = 'MAINTENANCE_REPOSITORY';
export const MAINTENANCE_VIEW_REPOSITORY = 'MAINTENANCE_VIEW_REPOSITORY';

export const maintenanceRepository = {
    provide: MAINTENANCE_REPOSITORY,
    useValue: Maintenance,
};

export const maintenanceViewRepository = {
    provide: MAINTENANCE_VIEW_REPOSITORY,
    useValue: MaintenanceView,
};