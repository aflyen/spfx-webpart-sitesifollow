# spfx-webpart-sitesifollow

This solutions is a basic WebPart build with [SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview) for SharePoint Online. The webpart allows you to list all the sites you follow in a sorted order. It is also possible to filter the list based on a URL filter. This webpart itself is not very interessting, and have been demonstrated many other times. The idea of this project is to provide a best practise project for my self to demonstrate a set of principals I believe should be considered when developing webparts.

## Recommondations

This example project demonstrates some important prinicipals for building custom SPFx webparts:

* PnP JS for calls to SharePoint APIs (https://github.com/pnp/pnpjs)
* PnP SPFx Controls to provide default title experience like 1. party WebParts (https://sharepoint.github.io/sp-dev-fx-controls-react/controls/WebPartTitle/)
* SPFx localization for English and Norwegian (https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts)
* Office UI Fabric React instead of Office UI Fabric Core (https://docs.microsoft.com/en-us/sharepoint/dev/spfx/office-ui-fabric-integration)
* SPFx theming with Office UI Fabric colors (https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-theme-colors-in-your-customizations)
* SASS for styling (https://docs.microsoft.com/en-us/sharepoint/dev/spfx/css-recommendations)
* Office UI Fabric components (https://docs.microsoft.com/en-us/sharepoint/dev/spfx/office-ui-fabric-integration)
* Reactive configuration of webpart properties (https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/integrate-with-property-pane)
* Service layer for keeping a clean user interface code design in React
* Placeholder for guiding users when no content is available

## Getting started

```bash
git clone the repo
npm i
gulp serve
```

## Depoyment and usage

Build the app with:

```bash
gulp bundle --ship
gulp package-solution --ship
```

Enable the app:

1. Upload the file "spfx-webpart-sitesifollow.sppkg" from  "/sharepoint/solution" to the App Catalog.
2. Go to either a modern Communication or Team Site.
3. Go to "Site contents" and add new "App"
4. Select "spfx-webpart-sitesifollow" and wait for it to be installed
5. Go to the front page, edit the page and add the "Sites I Follow" webpart

