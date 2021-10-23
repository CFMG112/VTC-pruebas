import { Nameplate } from './models/nameplate.model';

export const NAMEPLATE_REPOSITORY = 'NAMEPLATE_REPOSITORY';

export const nameplateRepository = {
    provide: NAMEPLATE_REPOSITORY,
    useValue: Nameplate,
};