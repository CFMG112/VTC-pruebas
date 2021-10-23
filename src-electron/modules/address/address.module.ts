import { Module, HttpModule } from '@nestjs/common';
import { AddressService } from './address.service';
import { addressRepository } from './address.providers';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [],
  providers: [
    AddressService,
    addressRepository
  ],
  exports: [ AddressService ]
})
export class AddressModule { }
