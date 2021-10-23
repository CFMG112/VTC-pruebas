import { Expose } from 'class-transformer';
import { Table, Column, Length, Model } from 'sequelize-typescript';

@Table({
    modelName:"Faq",
    tableName:"Faq",
    freezeTableName:true,
    schema:"sentry"
})
export class Faq extends Model<Faq> {

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    question: string;

    @Expose()
    @Length({ min: 1, max: 500 })
    @Column
    answer: string;

    static get modelName(): string {
        return 'faq';
    }
}