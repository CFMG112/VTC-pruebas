import { City } from './models/city.model';
import { CityView } from './models/city-view.model';

export const CITY_REPOSITORY = 'CITY_REPOSITORY';
export const CITY_VIEW_REPOSITORY = 'CITY_VIEW_REPOSITORY';

export const cityRepository = {
    provide: CITY_REPOSITORY,
    useValue: City,
};

export const cityViewRepository = {
    provide: CITY_VIEW_REPOSITORY,
    useValue: CityView,
};
