import { Module } from '@nestjs/common';
import { TransformerModule } from '../transformers/transformers.module';
import { SitesService } from './sites.service';
import { siteRepository, siteViewRepository } from './sites.providers';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [
    TransformerModule,
    AddressModule
  ],
  controllers: [],
  providers: [
    SitesService,
    siteRepository,
    siteViewRepository
  ],
  exports: [SitesService],
})
export class SitesModule { }
