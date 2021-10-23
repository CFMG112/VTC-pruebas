import { Module, HttpModule } from '@nestjs/common';
import { NameplatesService } from './nameplates.service';
import { nameplateRepository } from './nameplates.providers';


@Module({
  imports: [
    HttpModule
  ],
  controllers: [],
  providers: [
    NameplatesService,
    nameplateRepository
  ],
  exports: [NameplatesService]
})
export class NameplatesModule { }
