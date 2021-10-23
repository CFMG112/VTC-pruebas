import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { TransformerMaintenance } from './models/transformer-maintenace.model';
import { TRANSFORMER_MAINTENANCE_REPOSITORY } from './transformer-maintenances.providers';
import { Maintenance } from '../maintenance/models/maintenance.model';
import { Transformer } from '../transformers/models/transformer.model';

@Injectable()
export class TransformerMaintenanceService {
  constructor(
    @Inject(TRANSFORMER_MAINTENANCE_REPOSITORY) private readonly transMaintenances: typeof TransformerMaintenance,
  ) { }

  async create(params: TransformerMaintenance): Promise<TransformerMaintenance> {
    return this.transMaintenances.create(params);
  }

  async findAll(params?: any): Promise<TransformerMaintenance[]> {
    const {
      filter,
      limit,
      sort,
      skip,
      raw
    } = params;
    return this.transMaintenances.findAll({
      where: filter,
      limit,
      offset: skip,
      order: sort,
      raw,
      include: [Maintenance, Transformer]
    });
  }

  async findOne(filter = {}): Promise<TransformerMaintenance> {
    return this.transMaintenances.findOne({
      where: filter
    });
  }

  async findById(id: number): Promise<TransformerMaintenance> {
    return this.transMaintenances.findByPk(id);
  }

  async delete(id: number): Promise<TransformerMaintenance> {
    const removed = await this.findById(id);
    await this.transMaintenances.destroy({
      where: {
        id
      }
    });
    return removed;
  }

  async deleteMaintanances(transformerId: number) {
    const where = { transformerId };
    const count = this.transMaintenances.count({ where });
    await this.transMaintenances.destroy({
      where
    });
    return count;
  }

  async update(id: any, obj: any): Promise<[number, TransformerMaintenance[]]> {
    return this.transMaintenances.update(obj, {
      where: { id }
    });
  }

  async findTransformerMaintenances(params: any): Promise<TransformerMaintenance[]> {
    const { id, raw } = params;

    if (!id) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    try {
      const filter = { transformerId: id };
      return await this.findAll({
        filter, raw, include: [
          Maintenance
        ]
      })
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateMaintenances(params: any): Promise<TransformerMaintenance[]> {
    const { id, maintenances } = params;

    if (!id) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const currentMaintenances = await this.findTransformerMaintenances({ id, raw: true });
    const currentMaintenancesIds = this.getMaintenancesIds(currentMaintenances);
    const newMaintenancesIds = this.getMaintenancesIds(maintenances);

    for (const id of currentMaintenancesIds) {
      // If a current maintenance isn't in the new list anymore -> delete it
      if (!newMaintenancesIds.includes(id)) {
        await this.delete(id);
      }
    }

    for (const maintenance of maintenances) {
      if (maintenance.id) {
        // Maintenance has id (already exists), just update
        await this.update(maintenance.id, maintenance);
      } else {
        // New maintenance, then create
        maintenance.transformerId = id;
        await this.create(maintenance);
      }
    }

    return await this.findTransformerMaintenances({ id });
  }

  private getMaintenancesIds(maintenances: TransformerMaintenance[]): number[] {
    const maintenancesWithId = maintenances.filter(maintenance => maintenance.id);
    return maintenancesWithId.map(({ id }) => id);
  }
}
