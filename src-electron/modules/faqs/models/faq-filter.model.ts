import { Expose } from 'class-transformer';

export class FaqFilter {

    @Expose()
    question: string;

    @Expose()
    answer: string;
}
