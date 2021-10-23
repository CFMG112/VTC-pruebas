import { Injectable, InternalServerErrorException, Inject } from '@nestjs/common';
import { Maintenance } from './models/maintenance.model';
import { MaintenanceFilter } from './models/maintenance-filter.model';
import { MaintenanceResponseVm } from './models/maintenance-response-vm.model';
import { Logger } from '@nestjs/common';
import { Op } from 'sequelize';
import { MAINTENANCE_REPOSITORY, MAINTENANCE_VIEW_REPOSITORY } from './maintenance.providers';

@Injectable()
export class MaintenanceService {

    constructor(
        @Inject(MAINTENANCE_REPOSITORY) private readonly maintenanceRepository: typeof Maintenance,
        @Inject(MAINTENANCE_VIEW_REPOSITORY) private readonly maintenanceViewRepository: typeof Maintenance
    ) { }

    async create(maintenance: Maintenance): Promise<Maintenance> {
        return this.maintenanceRepository.create(maintenance);
    }

    async findAll(params?: any): Promise<Maintenance[]> {
        const { filter, limit, sort, skip } = params;
        return this.maintenanceRepository.findAll({

        });
    }

    async findById(id: number): Promise<Maintenance> {
        return this.maintenanceRepository.findByPk(id);
    }

    async update(id: number, item: any): Promise<Maintenance> {
        await this.maintenanceRepository.update(item, {
            where: {
                id: id
            }
        });

        return this.findById(item.id);
    }

    async delete(id: number): Promise<Maintenance> {
        const removed = await this.findById(id);
        await this.maintenanceRepository.destroy({
            where: {
                id
            }
        });
        return removed;
    }

    async createMaintenance(params: Maintenance): Promise<Maintenance> {
        try {
            const result = await this.create(params);
            return result.toJSON() as Maintenance;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async findByFilter(params: any): Promise<Maintenance[]> {
        const { filterByPredefined, predefined, type, description } = params;
        const atts = [];
        const filter = {
            [Op.or]: atts
        }

        if (filterByPredefined) {
            atts.push({
                predefined: predefined
            });
        }

        if (type) {
            atts.push({
                type: {
                    [Op.like]: `%${type}%`
                }
            });
        }

        if (description) {
            atts.push({
                description: {
                    [Op.like]: `%${description}%`
                }
            });
        }

        if (atts.length == 0) {
            delete filter[Op.or];
        }

        return this.maintenanceRepository.findAll({
            where: filter
        });
        
    }
}
