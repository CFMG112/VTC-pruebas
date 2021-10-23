import { User } from './models/user.model';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const userRepository = {
    provide: USER_REPOSITORY,
    useValue: User,
};