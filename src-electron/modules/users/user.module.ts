import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AccountService } from "../accounts/accounts.service";
import { AddressService } from "../address/address.service";
import { accountRepository } from '../accounts/accounts.providers';
import { addressRepository } from "../address/address.providers";

import { userRepository } from './user.provider';

@Module({
    imports: [
    ],
    providers: [
        UserService,
        userRepository,
        accountRepository,
        addressRepository,
        AccountService,
        AddressService
    ],
    exports: [UserService],
})
export class UserModule {}

