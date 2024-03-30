import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsFeatureRoutingModule } from './requests-feature-routing.module';
import {RequestsComponent} from "./requests/requests.component";
import {SharedModule} from "../../../shared/shared.module";
import { RequestMenuStatusComponent } from './requests/request-menu-status/request-menu-status.component';


@NgModule({
  declarations: [
    RequestsComponent,
    RequestMenuStatusComponent
  ],
  imports: [
    CommonModule,
    RequestsFeatureRoutingModule,
    SharedModule
  ],
})
export class RequestsFeatureModule { }
