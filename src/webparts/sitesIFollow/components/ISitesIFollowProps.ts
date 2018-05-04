import { DisplayMode } from '@microsoft/sp-core-library';

export interface ISitesIFollowProps {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  urlFilter: string;
}
