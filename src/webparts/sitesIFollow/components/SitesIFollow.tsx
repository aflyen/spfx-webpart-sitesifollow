import * as React from 'react';
import styles from './SitesIFollow.module.scss';
import * as strings from 'SitesIFollowWebPartStrings';
import { ISitesIFollowState } from './ISitesIFollowState';
import { ISitesIFollowProps } from './ISitesIFollowProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IFollowedSitesService } from '../services/IFollowedSitesService';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MockFollowedSiteService, FollowedSiteService } from '../services';
import { IFollowedSite } from '../models/IFollowedSite';
import FollowedSite from './FollowedSite/FollowedSite';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export default class SitesIFollow extends React.Component<ISitesIFollowProps, ISitesIFollowState> {
  private _service: IFollowedSitesService;
  private _followedSites: IFollowedSite[];

  constructor(props: ISitesIFollowProps) {
    super(props);

    this.state = {
      isLoading: true,
      items: [],
    };
  }

  public async componentDidMount() {
    // Set up services
    this._service = (Environment.type === EnvironmentType.Test || Environment.type === EnvironmentType.Local) ?
      new MockFollowedSiteService() :
      new FollowedSiteService();

    // Get the sites the user follows from service
    let sites: IFollowedSite[] = await this._service.getSites(this.props.urlFilter);

    this.setState({
      items: sites,
      isLoading: false,
    });
  }

  public async componentDidUpdate(prevProps: ISitesIFollowProps) {
    // Reactive configuration of properties in webpart
    if (prevProps.urlFilter !== this.props.urlFilter) {
      // Get a updated list of sites user follow when webpart configuration have changed
      let sites: IFollowedSite[] = await this._service.getSites(this.props.urlFilter);

      this.setState({
        items: sites,
      });
    }
  }

  public render(): React.ReactElement<ISitesIFollowProps> {
    return (
      <div className={ styles.sitesIFollow }>
        <WebPartTitle displayMode={this.props.displayMode}  title={this.props.title}  updateProperty={this.props.updateProperty} />
        {this.state.isLoading && 
          <Spinner size={ SpinnerSize.small } />
        }
        {!this.state.isLoading && (this.state.items.length === 0) &&
          <div>{strings.NoSitesFollowedPlaceHolderText1}<Icon iconName='FavoriteStar' />{strings.NoSitesFollowedPlaceHolderText2}</div>
        }
        {!this.state.isLoading && this.state.items.map((item: IFollowedSite) =>
          <FollowedSite name={item.Title} url={item.Url} onUnfollowSite={ () => this._onUnfollowSite(item) }  />
        )}
      </div>
    );
  }

  private _onUnfollowSite = async (site: IFollowedSite) => {
    this.setState({
      isLoading: true,
    });

    // Stop following the selected site
    await this._service.unfollowSite(site);

    // Get a updated list of followed sites
    let sites: IFollowedSite[] = await this._service.getSites(this.props.urlFilter);

    this.setState({
      isLoading: false,
      items: sites
    });
  }
}
