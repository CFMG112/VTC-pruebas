import { Injectable, InternalServerErrorException, Logger, Inject } from '@nestjs/common';
import { Country } from './models/country.model';
import { COUNTRY_REPOSITORY } from './countries.providers';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class CountryService {

    constructor(
        @Inject(COUNTRY_REPOSITORY) private readonly countryRepository: typeof Country,
    ) { }


    async findAll(params?: any): Promise<Country[]> {
        return this.countryRepository.findAll({});
    }
    
    async findById(id: number): Promise<Country> {
        return this.countryRepository.findByPk(id);
    }
    
    async findOne(id:any): Promise<Country> {
      return this.countryRepository.findOne(id);
    }
  
    async create(obj: any): Promise<Country> {
      return this.countryRepository.create(obj);
    }
  
    async update(id:any, obj: any): Promise< [number, Country[]]> {
      return this.countryRepository.update(obj, {
        where: { id }
      });
    }
    
    async delete(id:any): Promise<number> {
      return this.countryRepository.destroy({
        where: {
            id
        },
        cascade: true
    });
    }

    // async create(params: Faq): Promise<Faq> {
    //     return this.faqsRepository.create(params);
    // }

    // async findAll(params?: any): Promise<Faq[]> {
    //     const { filter, limit, sort, skip } = params;
    //     return this.faqsRepository.findAll({
    //         where: filter,
    //         limit,
    //         offset: skip,
    //         order: sort
    //     });
    // }

    // async findOne(filter = {}): Promise<Faq> {
    //     return this.faqsRepository.findOne({
    //         where: filter
    //     });
    // }

    // async findById(id: number): Promise<Faq> {
    //     return this.faqsRepository.findByPk(id);
    // }

    // async delete(id: number): Promise<Faq> {
    //     const removed = await this.findById(id);
    //     await this.faqsRepository.destroy({
    //         where: {
    //             id
    //         }
    //     });
    //     return removed;
    // }

    // async update(id: number, item: any): Promise<Faq> {
    //     await this.faqsRepository.update(item, {
    //         where: {
    //             id: id
    //         }
    //     });
    //     return this.findById(id);
    // }

    // async findByFilter(params: FaqFilter): Promise<FaqResponse> {
    //     const { question, answer, skip, limit } = params as any;

    //     let atts = [];
    //     let filter = {
    //         [Op.or]: atts
    //     };

    //     if (question) {
    //         atts.push({
    //             question: {
    //                 [Op.like]: `%${question}%`
    //             } 
    //         });
    //     }

    //     if (answer) {
    //         atts.push({
    //             answer: {
    //                 [Op.like]: `%${answer}%`
    //             } 
    //         });
    //     }

    //     if (atts.length == 0) {
    //         delete filter[Op.or];
    //     }

    //     try {
    //         const faqs = await this.findAll({ filter, skip, limit });
    //         return {
    //             data: faqs,
    //         };
    //     } catch (e) {
    //         Logger.log(e, 'FaqService');
    //         throw new InternalServerErrorException(e);
    //     }
    // }
}
