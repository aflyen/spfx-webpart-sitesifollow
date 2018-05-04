import { IFollowedSitesService } from "./IFollowedSitesService";
import { IFollowedSite } from "../models/IFollowedSite";
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse, HttpClientResponse } from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class FollowedSiteService implements IFollowedSitesService {
    private _context: IWebPartContext;

    constructor(private context: IWebPartContext) {
        this._context = context;
    }

    public async getSites(urlFilter: string): Promise<IFollowedSite[]>
    {
        // Get followed sites from SharePoint Home API (Delve)
        let url = this._context.pageContext.web.absoluteUrl +  "/_vti_bin/homeapi.ashx/sites/followed?mostRecentFirst=true&start=0&count=100&fillSiteData=true";
        
        let httpClientOptions : ISPHttpClientOptions = {};
      
        httpClientOptions.headers = {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': '3.0'
        };

        let response = await this._context.spHttpClient.post(url, SPHttpClient.configurations.v1, httpClientOptions);

        if (!response.ok) {
            return null;
        }

        let data = await response.json();

        // Map data
        let followedSites: IFollowedSite[] = data.Items.map((result: any) => {
            let followedSite: IFollowedSite = { 
                Title: result.Title, 
                Url: result.Url
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
        let url = this._context.pageContext.web.absoluteUrl + "/_vti_bin/homeapi.ashx/sites/followed/remove";
        let httpClientOptions : ISPHttpClientOptions = {};
        
        httpClientOptions.headers = {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': '3.0',
        };

        httpClientOptions.body = JSON.stringify(site.Url);

        let response = await this._context.spHttpClient.post(url, SPHttpClient.configurations.v1, httpClientOptions);

        if (!response.ok) {
            return false;
        }

        return true;
    }
}