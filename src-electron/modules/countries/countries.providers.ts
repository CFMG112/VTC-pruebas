import { Country } from './models/country.model';

export const COUNTRY_REPOSITORY = 'COUNTRY_REPOSITORY';

export const countryRepository = {
    provide: COUNTRY_REPOSITORY,
    useValue: Country,
};