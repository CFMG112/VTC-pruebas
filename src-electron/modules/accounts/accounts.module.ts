import { Module } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { accountRepository, accountViewRepository } from './accounts.providers';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [
    AddressModule
  ],
  providers: [
    AccountService,
    accountRepository,
    accountViewRepository
  ],
  controllers: [  ],
  exports: [ AccountService ]
})
export class AccountModule {
}
