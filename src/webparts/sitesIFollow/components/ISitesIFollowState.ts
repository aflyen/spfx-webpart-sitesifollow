import { IFollowedSite } from "../models/IFollowedSite";

export interface ISitesIFollowState {
    isLoading: boolean;
    items: IFollowedSite[];
}