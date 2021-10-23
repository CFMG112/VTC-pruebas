import { State } from './models/state.model';

export const STATE_REPOSITORY = 'STATE_REPOSITORY';

export const countryRepository = {
    provide: STATE_REPOSITORY,
    useValue: State,
};