import { Injectable, InternalServerErrorException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { STATE_REPOSITORY } from './states.providers';
import { State } from './models/state.model';
import { StateFilter } from './models/state-filter.model';
import { StateResponseVm } from './models/state-response-vm.model';
import { Logger } from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class StatesService {

    constructor(
        @Inject(STATE_REPOSITORY) private readonly stateRepository: typeof State,
    ) { }


    // SOLO BUSCA EN BASE A UN ID
    async findAll(params?: any): Promise<State[]> {
        return this.stateRepository.findAll({where: {
          countryId: params[0]
        }});
    }
    
    async findById(id: number): Promise<State> {
        return this.stateRepository.findByPk(id);
    }
    
    async findOne(id:any): Promise<State> {
      return this.stateRepository.findOne(id);
    }
  
    async create(obj: any): Promise<State> {
      return this.stateRepository.create(obj);
    }
  
    async update(id:any, obj: any): Promise<[number, State[]]> {
      return this.stateRepository.update(obj, {
        where: { id }
      });
    }
    
    async delete(id:any): Promise<number> {
      return this.stateRepository.destroy({
        where: {
            id
        },
        cascade: true
    });
    }

}
