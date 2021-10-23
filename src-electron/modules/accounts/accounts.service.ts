import { Injectable, InternalServerErrorException, Inject } from '@nestjs/common';
import { Account } from './models/account.model';
import { Address } from '../address/models/address.model';
import { Country } from '../countries/models/country.model';
import { AccountParams } from './models/account-params.model';
import { AccountFilter } from './models/account-filter.model';
import { AccountResponseVm } from './models/account-response-vm.model';
import { AddressService } from '../address/address.service';
import { ACCOUNT_REPOSITORY } from './accounts.providers';
import { Op } from 'sequelize';
import { Logger } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(
    private readonly addressService: AddressService,
    @Inject(ACCOUNT_REPOSITORY) private readonly accountRepository: typeof Account,
  ) { }

  async create(account: Account): Promise<Account> {
    return this.accountRepository.create(account);
  }

  async createAccount(params: AccountParams): Promise<Account> {
    const {
      name,
      company,
      sector,
      address,
      expirationDate,
      isActive
    } = params;

    const savedAddress = await this.addressService.create(address);

    const newAccount: Account = {
      name,
      company,
      sector,
      expirationDate,
      isActive,
      addressId: savedAddress.id
    } as any;

    try {
      const result = await this.create(newAccount);
      return result.toJSON() as Account;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(params?: any): Promise<Account[]> {
    const { filter, limit, sort, skip } = params;
    return this.accountRepository.findAll({
      where: filter,
      limit,
      offset: skip,
      order: sort,
      raw: true,
      include: [
        {
          model: Address,
          include: [
            Country
          ]
        }
      ]
    });
  }

  async findOne(filter = {}): Promise<Account> {
    let account = await this.accountRepository.findOne({
      include: [
        Address
      ]
    }) as Account;
    return account
  }

  async findById(id: number): Promise<Account> {
    return this.accountRepository.findByPk(id, {
      include: [
        Address
      ]
    });
  }

  async delete(id: number): Promise<Account> {
    const removed = await this.findById(id);
    await this.accountRepository.destroy({
      where: {
        id
      },
      cascade: true
    });
    return removed;
  }

  async update(id: number, item: Account): Promise<Account> {

    const address = item.address;
    const addressId = address.id;
    if (address.id) {
      await this.addressService.update(addressId, address);
    }
    else {
      await this.addressService.create(address).then(address => {
        item.addressId = address.id
      });
    }

    await this.accountRepository.update(item, {
      where: {
        id: id
      }
    });
    return this.findById(id);
  }

  async findByFilter(params: AccountFilter): Promise<AccountResponseVm> {
    const { name, company, sector, skip, limit, expiration } = params;

    let atts = [];
    let filter = {
      [Op.or]: atts
    };

    if (name) {
      atts.push({
        name: {
          [Op.like]: `%${name}%`
        }
      });
    }

    if (company) {
      atts.push({
        company: {
          [Op.like]: `%${company}%`
        }
      });
    }

    if (sector) {
      atts.push({
        sector: {
          [Op.like]: `%${sector}%`
        }
      });
    }

    if (atts.length == 0) {
      delete filter[Op.or];
    }

    try {
      const today = new Date();
      const inOneMonth = new Date();
      inOneMonth.setDate(today.getDate() + 30);

      const getExpiration = (account: Account) => {
        const { expirationDate } = account;
        if (today > expirationDate) return 3;
        if (inOneMonth > expirationDate) return 2;
        return 1;
      }

      const sort = [
        ['name', 'ASC']
      ]
      const raw_accounts = await this.findAll({
        filter, limit, sort, skip
      });
      let accounts = raw_accounts.map(account => ({
        expiration: getExpiration(account),
        ...account
      }));

      if (expiration) {
        accounts = accounts.filter(account => account.expiration == expiration);
      }

      const vmAccounts = this.mapAccounts(accounts);

      return {
        total: vmAccounts.length,
        data: vmAccounts,
      };

    } catch (e) {
      Logger.error(e)
      throw new InternalServerErrorException(e);
    }
  }

  mapAccounts(accounts: any): any[] {
    return accounts.map((account: any) => ({
      id: account.id,
      name: account.name,
      company: account.company,
      sector: account.sector,
      expiration: account.expiration,
      isActive: account.isActive,
      expirationDate: account.expirationDate,
      country: account['address.country.country']
    }));
  }
}
