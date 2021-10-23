import { Injectable, Inject } from '@nestjs/common';
import { Nameplate } from './models/nameplate.model';
import { NAMEPLATE_REPOSITORY } from './nameplates.providers';

@Injectable()
export class NameplatesService {

    constructor(
        @Inject(NAMEPLATE_REPOSITORY) private readonly nameplateRepository: typeof Nameplate,
    ) { }

    async create(params: Nameplate): Promise<Nameplate> {
        return this.nameplateRepository.create(params);
    }

    async findAll(params?: any): Promise<Nameplate[]> {
        const { filter, limit, sort, skip } = params;
        return this.nameplateRepository.findAll({
            where: filter,
            limit,
            offset: skip,
            order: sort
        });
    }

    async findOne(filter = {}): Promise<Nameplate> {
        return this.nameplateRepository.findOne({
            where: filter
        });
    }

    async findById(id: number): Promise<Nameplate> {
        return this.nameplateRepository.findByPk(id);
    }

    async delete(id: number): Promise<Nameplate> {
        const removed = await this.findById(id);
        await this.nameplateRepository.destroy({
            where: {
                id
            }
        });
        return removed;
    }

    async update(id: number, item: any): Promise<Nameplate> {
        await this.nameplateRepository.update(item, {
            where: {
                id: id
            }
        });
        return this.findById(id);
    }
}
