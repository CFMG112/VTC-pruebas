import { UserRole } from './user-role.enum';
import { Account } from '../../accounts/models/account.model';
import { Expose } from 'class-transformer';
import { Model, Column, Table, Unique, Length, DataType, ForeignKey } from 'sequelize-typescript';

@Table({
    modelName: "User",
    tableName: "User",
    freezeTableName: true,
    schema: "sentry"
})
export class User extends Model<User> {

    @Expose()
    @ForeignKey(() => Account)
    @Column
    accountId: number;

    @Expose()
    @Column(DataType.TINYINT)
    role?: UserRole;

    @Expose()
    @Length({ min: 6, max: 45 })
    @Unique
    @Column
    username: string;

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    firstName?: string;

    @Expose()
    @Length({ min: 1, max: 45 })
    @Column
    lastName?: string;

    @Expose()
    @Length({ min: 6, max: 100 })
    @Column
    password: string;

    @Expose()
    @Length({ min: 6, max: 250 })
    @Column
    webToken?: string;

    @Expose()
    @Length({ min: 6, max: 250 })
    @Column
    token?: string;

    @Expose()
    @Column(DataType.VIRTUAL)
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    @Expose()
    @Column(DataType.VIRTUAL)
    get email(): string {
        return `${this.username}`;
    }

    static get modelName(): string {
        return 'User';
    }
}
