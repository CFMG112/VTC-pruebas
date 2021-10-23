import { Account } from './models/account.model';
import { AccountView } from './models/account-view.model';

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';
export const ACCOUNT_VIEW_REPOSITORY = 'ACCOUNT_VIEW_REPOSITORY';

export const accountRepository = {
    provide: ACCOUNT_REPOSITORY,
    useValue: Account,
};

export const accountViewRepository = {
    provide: ACCOUNT_VIEW_REPOSITORY,
    useValue: AccountView,
};