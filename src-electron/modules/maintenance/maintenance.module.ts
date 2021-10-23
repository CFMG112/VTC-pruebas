import { Module, HttpModule } from '@nestjs/common';
import { TransformerModule } from '../transformers/transformers.module';
import { MaintenanceService } from './maintenance.service';
import {  maintenanceRepository, maintenanceViewRepository} from './maintenance.providers';

@Module({
  imports: [
    HttpModule,
    TransformerModule
  ],
  controllers: [  ],
  providers: [
    MaintenanceService,
    maintenanceRepository, 
    maintenanceViewRepository
  ],
  exports: [MaintenanceService],
})
export class MaintenanceModule { }


