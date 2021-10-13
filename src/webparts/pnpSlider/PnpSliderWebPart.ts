import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnpSliderWebPartStrings';
import { PnpSlider } from './components/PnpSlider';

import { IPnpSliderProps } from './components/IPnpSliderProps';
import { sp } from "@pnp/sp/presets/all";

import PnPTelemetry from "@pnp/telemetry-js";

const telemetry = PnPTelemetry.getInstance();
telemetry.optOut();

export interface IPnpSliderWebPartProps {
  description: string;
}

export default class PnpSliderWebPart extends BaseClientSideWebPart<IPnpSliderWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context,
        sp: {
          headers: {
            Accept: "application/json; odata=nometadata"
          }
        }
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IPnpSliderProps> = React.createElement(
      PnpSlider,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
