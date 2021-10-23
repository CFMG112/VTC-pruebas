import { Site } from './models/site.model';
import { SiteView } from './models/site-vew.model';

export const SITE_REPOSITORY = 'SITE_REPOSITORY';
export const SITE_VIEW_REPOSITORY = 'SITE_VIEW_REPOSITORY';


export const siteRepository = {
    provide: SITE_REPOSITORY,
    useValue: Site,
};

export const siteViewRepository = {
    provide: SITE_VIEW_REPOSITORY,
    useValue: SiteView,
};