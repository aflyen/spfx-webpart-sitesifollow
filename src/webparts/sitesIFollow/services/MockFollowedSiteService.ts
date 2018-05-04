import { IFollowedSitesService } from "./IFollowedSitesService";
import { IFollowedSite } from "../models/IFollowedSite";

export class MockFollowedSiteService implements IFollowedSitesService {
    public async getSites(urlFilter: string): Promise<IFollowedSite[]>
    {
        return new Promise<IFollowedSite[]>((resolve: (options: IFollowedSite[]) => void, reject: (error: any) => void) => {
            setTimeout((): void => {
                resolve([{
                    Title: "Marketing "  + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/marketing"
                },
                {
                    Title: "Legal "  + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/legal"
                }, {
                    Title: "Research and Development " + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/rnd"
                },
                {
                    Title: "Marketing "  + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/marketing"
                },
                {
                    Title: "Legal "  + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/legal"
                }, {
                    Title: "Research and Development " + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/rnd"
                },
                {
                    Title: "Marketing "  + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/marketing"
                },
                {
                    Title: "Legal "  + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/legal"
                }, {
                    Title: "Research and Development " + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/rnd"
                },
                {
                    Title: "Marketing "  + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/marketing"
                },
                {
                    Title: "Legal "  + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/legal"
                }, {
                    Title: "Research and Development " + (Math.floor(Math.random() * 100) + 1),
                    Url: "https://contoso.sharepoint.com/sites/rnd"
                }]);
            }, 1500);
        });
    }

    public async unfollowSite(site: IFollowedSite): Promise<boolean>
    {
        const promise = new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });

        return promise;
    }
}