import { HttpModule, Module } from '@nestjs/common';
import { TransformerMaintenanceService } from './transformer-maintenances.service';
import { transformerMaintenanceRepository } from './transformer-maintenances.providers';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        transformerMaintenanceRepository,
        TransformerMaintenanceService
    ],
    controllers: [  ],
    exports: [
        TransformerMaintenanceService
    ]
})
export class TransformerMaintenanceModule { }
