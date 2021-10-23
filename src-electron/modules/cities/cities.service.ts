import { Injectable, InternalServerErrorException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CITY_REPOSITORY, CITY_VIEW_REPOSITORY} from './cities.providers';
import { City } from './models/city.model';
import { CityFilter } from './models/cities-filter.model';
import { CitiesResponseVm } from './models/city-response-vm.model';
import { Logger } from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class CitiesService {

    constructor(
        @Inject(CITY_REPOSITORY) private readonly cityRepository: typeof City,
        @Inject(CITY_VIEW_REPOSITORY) private readonly cityViewRepository: typeof City,
    ) { }

    async findAll(params?: any): Promise<City[]> {
        return this.cityRepository.findAll({});
    }

    async findByFilter(params?: any): Promise<City[]> {
      return this.cityRepository.findAll({ where: {
        stateId: params[0]
      }});
  }
    
    async findById(id: number): Promise<City> {
        return this.cityRepository.findByPk(id);
    }
    
    async findOne(id:any): Promise<City> {
      return this.cityRepository.findOne(id);
    }
  
    async create(obj: any): Promise<City> {
      return this.cityRepository.create(obj);
    }
  
    async update(id:any, obj: any): Promise<[number, City[]]> {
      return this.cityRepository.update(obj, {
        where: { id }
      });
    }
    
    async delete(id:any): Promise<number> {
      return this.cityRepository.destroy({
        where: {
            id
        },
        cascade: true
    });
    }

}
