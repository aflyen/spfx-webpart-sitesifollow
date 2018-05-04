import { DisplayMode } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface ISitesIFollowProps {
  context: IWebPartContext;
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  urlFilter: string;
}
