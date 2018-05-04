import { IFollowedSite } from './../models/IFollowedSite';

export interface IFollowedSitesService {
    getSites: (urlFilter: string) => Promise<IFollowedSite[]>;
    unfollowSite: (site: IFollowedSite) => Promise<boolean>;
}