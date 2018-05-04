import { IFollowedSitesService } from "./IFollowedSitesService";
import { IFollowedSite } from "../models/IFollowedSite";
import { sp, SocialActorType, SocialActorTypes } from "@pnp/sp";

export class FollowedSiteService implements IFollowedSitesService {
    public async getSites(urlFilter: string): Promise<IFollowedSite[]>
    {
        // Get followed sites from SharePoint Social API
        const results = await sp.social.my.followed(SocialActorTypes.Site);

        // Map data
        let followedSites: IFollowedSite[] = results.map((result: any) => {
            let followedSite: IFollowedSite = { 
                Title: result.Name, 
                Url: result.Uri
            };

            return followedSite;
        });

        // Get sites only matching the URL filter
        if (urlFilter !== null && urlFilter.length > 0) {
            followedSites = followedSites.filter((site: IFollowedSite) => {
                if (site.Url.indexOf(urlFilter) > 0) {
                    return true;
                }

                return false;
            });
        }

        // Order by name
        if (followedSites.length > 0) {
            followedSites = followedSites.sort((a: IFollowedSite, b: IFollowedSite) => {
                if (a.Title < b.Title) return -1;
                if (a.Title > b.Title) return 1;

                return 0;
            });
        }

        return followedSites;
    }

    public async unfollowSite(site: IFollowedSite): Promise<boolean>
    {
        let url:string = site.Url;

        // Stop following the site with SharePoint Social API service
        const result = await sp.social.stopFollowing({
            ContentUri: site.Url,
            ActorType: SocialActorType.Site,
        });

        if (result == null && result["odata.null"] != true) {
            return false;
        }

        return true;
    }
}