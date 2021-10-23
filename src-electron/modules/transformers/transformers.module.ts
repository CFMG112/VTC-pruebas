import { HttpModule, Module } from '@nestjs/common';
import { TransformerService } from './transformers.service';
import { transformerRepository, transformerViewRepository } from './transformers.providers';
import { TransformerMaintenanceModule } from '../transformer-maintenances/transformer-maintenances.module';
import { NameplatesModule } from '../nameplates/nameplates.module';
import { LogModule } from '../logs/logs.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    HttpModule,
    TransformerMaintenanceModule,
    NameplatesModule,
    LogModule
  ],
  controllers: [],
  providers: [
    TransformerService,
    transformerRepository,
    transformerViewRepository
  ],
  exports: [TransformerService]
})
export class TransformerModule { }
