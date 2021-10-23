import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { faqRepository } from './faq.provider';

@Module({
    imports: [
    ],
    providers: [
        FaqService,
        faqRepository
    ],
    exports: [FaqService],
})
export class FaqModule {}

