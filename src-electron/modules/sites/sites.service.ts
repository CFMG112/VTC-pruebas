import { forwardRef, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Site } from './models/site.model';
import { Address } from '../address/models/address.model';
import { SiteFilter } from './models/site-filter.model';
import { SiteCreateVm } from './models/view-models/site-create-vm.model';
import { SiteResponseVm } from './models/view-models/site-response-vm.model';
import { AddressService } from '../address/address.service';
import { SITE_REPOSITORY, SITE_VIEW_REPOSITORY } from './sites.providers';
import { Op } from 'sequelize';
import { SiteView } from './models/site-vew.model';
import { Country } from '../countries/models/country.model';
import { City } from '../cities/models/city.model';
import { State } from '../states/models/state.model';

@Injectable()
export class SitesService {

  constructor(
    private readonly addressService: AddressService,
    @Inject(SITE_REPOSITORY) private readonly siteRepository: typeof Site,
    @Inject(SITE_VIEW_REPOSITORY) private readonly siteViewRepository: typeof SiteView,

  ) { }

  async create(params: Site): Promise<Site> {
    return this.siteRepository.create(params);
  }

  async createSite(vm: SiteCreateVm) {
    const { name, accountId, addedcity, address } = vm;

    console.log("vm" + name + accountId + addedcity + address);

    const savedAddress = await this.addressService.create(address);


    const newSite: Site = {
      name,
      accountId,
      addedcity,
      addressId: savedAddress.id
    } as any;

    try {
      return await this.create(newSite);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params?: any): Promise<Site[]> {
    const { filter, limit, sort, skip } = params;
    return this.siteRepository.findAll({
      where: filter,
      limit,
      offset: skip,
      order: sort,
      raw: true,
      include: [
        {
          model: Address,
          include: [ City, State, Country ]
        }
      ]
    });

  }

  async findById(id: number): Promise<Site> {
    return this.siteRepository.findByPk(id, {
      include: [
        Address
      ]
    });
  }

  async findOne(filter = {}): Promise<Site> {
    return this.siteRepository.findOne({
      where: filter
    });
  }

  async update(id: number, item: Site): Promise<Site> {
    const address = item.address;
    const addressId = address.id;
    await this.addressService.update(addressId, address);

    await this.siteRepository.update(item, {
      where: {
        id: id
      }
    });
    return this.findById(id);
  }

  async updateSite(params: any): Promise<Site> {
    const { id } = params;

    if (!id) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const exist = await this.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }

    try {
      const result = await this.update(id, params);
      return result.toJSON() as Site;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async delete(id: number): Promise<any> {
    const removed = await this.findById(id);
    await this.siteRepository.destroy({
      where: {
        id
      },
      cascade: true
    });
    return {removed:"okay"};
  }

  async findByFilter(params: SiteFilter): Promise<SiteResponseVm> {
    const { name, address, city, state, country, skip, limit } = params;

    const atts = [];
    const filter = {
      [Op.or]: atts
    }

    if (name) {
      atts.push({
        name: {
          [Op.like]: `%${name}%`
        }
      });
    }

    if (address) {
      atts.push({
        '$address.address$': {
          [Op.like]: `%${address}%`
        }
      })
    }

    if (city) {
      atts.push({
        '$address.city.city$': {
          [Op.like]: `%${city}%`
        }
      })
    }

    if (state) {
      atts.push({
        '$address.state.state$': {
          [Op.like]: `%${state}%`
        }
      })
    }

    if (country) {
      atts.push({
        '$address.country.country$': {
          [Op.like]: `%${country}%`
        }
      })
    }

    if (atts.length == 0) {
      delete filter[Op.or];
    }

    try {
      const sites = await this.findAll({ filter, skip, limit });

      return {
        total: sites.length,
        data: sites,
      };

    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

}
