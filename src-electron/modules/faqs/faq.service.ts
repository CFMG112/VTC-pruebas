import { Injectable, InternalServerErrorException, Logger, Inject } from '@nestjs/common';
import { Faq } from './models/faq.model';
import { FaqFilter } from './models/faq-filter.model';
import { FaqResponse } from './models/faq-response.model';
import { FAQ_REPOSITORY } from './faq.provider';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class FaqService {

    constructor(
        @Inject(FAQ_REPOSITORY) private readonly faqsRepository: typeof Faq,
    ) { }


    async findAll(params?: any): Promise<Faq[]> {
        const { Op } = require("sequelize");
        if(params[0].question == '' || !params[0].question){
          return this.faqsRepository.findAll({});
        }
        return this.faqsRepository.findAll({where: Sequelize.or(
          {question: {
            [Op.substring]: params[0].question
          }},
          {answer: {
            [Op.substring]: params[0].answer
          }}
        )});
    }
    
    async findById(id: number): Promise<Faq> {
        return this.faqsRepository.findByPk(id);
    }
    
    async findOne(id:any): Promise<Faq> {
      return this.faqsRepository.findOne(id);
    }
  
    async create(obj: any): Promise<Faq> {
      return this.faqsRepository.create(obj);
    }
  
    async update(id:any, obj: any): Promise<[number, Faq[]]> {
      return this.faqsRepository.update(obj, {
        where: { id }
      });
    }
    
    async delete(id:any): Promise<number> {
      return this.faqsRepository.destroy({
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
