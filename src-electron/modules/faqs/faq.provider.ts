import { Faq } from './models/faq.model';

export const FAQ_REPOSITORY = 'FAQ_REPOSITORY';

export const faqRepository = {
    provide: FAQ_REPOSITORY,
    useValue: Faq,
};