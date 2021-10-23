import { ipcMain } from 'electron';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { FaqService } from '../../modules/faqs/faq.service';

export class FaqController{
  private faqService: FaqService

  constructor(app: INestApplicationContext){
    this.faqService = app.get(FaqService);
  }

  init(){
    Logger.log("init", 'FaqController');

    ipcMain.handle("/faqs", async (event, ...args) => {
      const result = await this.faqService.findAll(args);
      return result.map(el => el.get({ plain: true }));
    })

    ipcMain.handle("/faqs/id", async (event, args) => {
      const result = await this.faqService.findById(args);
      const faq = result.get({ plain: true });
      return faq;
    })

    ipcMain.handle("/faqs/create", async (event, args) => {
      const result = await this.faqService.create(args);
      const faq = result.get({ plain: true });
      return faq;
    })

    ipcMain.handle("/faqs/update", async (event, args) => {
      const result = await this.faqService.update(args.id, args.obj);
      return result;
    })

    ipcMain.handle("/faqs/delete", async (event, id) => {
      const result = await this.faqService.delete(id);
      return result;
    })

  }
  
}