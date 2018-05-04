import * as React from 'react';
import styles from './../SitesIFollow.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IFollowedSiteProps } from './IFollowedSiteProps';
import { IFollowedSiteState } from './IFollowedSiteState';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as strings from 'SitesIFollowWebPartStrings';

export default class FollowedSite extends React.Component<IFollowedSiteProps, IFollowedSiteState> {

  constructor(props: IFollowedSiteProps) {
    super(props);

    this.state = {
      showConfirmDialog: false,
    };
  }

  public render(): React.ReactElement<IFollowedSiteProps> {
    return (
      <div className={ styles.followedSite }>
        <Icon iconName='FavoriteStarFill' className={ styles.followedSiteIcon } onClick={ this._openDialog } ariaLabel={ strings.StopFollowLabel } title={ strings.StopFollowLabel } /><a href={this.props.url} target="_blank">{this.props.name}</a>
        <Dialog
          hidden={ !this.state.showConfirmDialog }
          onDismiss={ this._closeDialog }
          dialogContentProps={ {
            type: DialogType.normal,
            title: strings.StopFollowLabel,
            subText: strings.StopFollowConfirmation
          } }
          modalProps={ {
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
          } }
        >
          <DialogFooter>
            <PrimaryButton onClick={ this._unFollowSite } text={ strings.StopFollowButtonText } />
            <DefaultButton onClick={ this._closeDialog } text={ strings.CancelButtonText } />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _openDialog = ():void => {
    this.setState({
      showConfirmDialog: true,
    });
  }

  private _closeDialog = ():void => {
    this.setState({
      showConfirmDialog: false,
    });
  }

  private _unFollowSite = (): void => {
    this.props.onUnfollowSite();

    this._closeDialog();
  }
}
