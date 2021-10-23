import { Address } from './models/address.model';

export const ADDRESS_REPOSITORY = 'ADDRESS_REPOSITORY';

export const addressRepository = {
    provide: ADDRESS_REPOSITORY,
    useValue: Address,
};