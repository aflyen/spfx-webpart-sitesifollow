import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import * as strings from 'SitesIFollowWebPartStrings';
import SitesIFollow from './components/SitesIFollow';
import { ISitesIFollowProps } from './components/ISitesIFollowProps';

export interface ISitesIFollowWebPartProps {
  title: string;
  urlFilter: string;
}

export default class SitesIFollowWebPart extends BaseClientSideWebPart<ISitesIFollowWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISitesIFollowProps > = React.createElement(
      SitesIFollow,
      {
        context: this.context,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        urlFilter: this.properties.urlFilter
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('urlFilter', {
                  label: strings.UrlFilterFieldLabel,
                  description: strings.UrlFilterFieldDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
