import { Injectable, Inject } from '@nestjs/common';
import { Address } from './models/address.model';
import { ADDRESS_REPOSITORY } from './address.providers';

@Injectable()
export class AddressService {

    constructor(
        @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: typeof Address,
    ) { }

    async create(params: Address): Promise<Address> {
        return this.addressRepository.create(params);
    }

    async findAll(params?: any): Promise<Address[]> {
        const { filter, limit, sort, skip } = params;
        return this.addressRepository.findAll({
            where: filter,
            limit,
            offset: skip,
            order: sort
        });
    }

    async findOne(filter = {}): Promise<Address> {
        return this.addressRepository.findOne({
            where: filter
        });
    }

    async findById(id: number): Promise<Address> {
        return this.addressRepository.findByPk(id);
    }

    async delete(id: number): Promise<Address> {
        const removed = await this.findById(id);
        await this.addressRepository.destroy({
            where: {
                id
            }
        });
        return removed;
    }

    async update(id: number, item: any): Promise<Address> {
        await this.addressRepository.update(item, {
            where: {
                id: id
            }
        });
        return this.findById(id);
    }
}
