import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateFeatureRoutingModule } from './candidate-feature-routing.module';
import {CandidatesComponent} from "./candidates/candidates.component";
import {AnalyseComponent} from "./candidates/analyse/analyse.component";
import {SharedModule} from "../../../shared/shared.module";
import {MatSidenavModule} from '@angular/material/sidenav';
import {ViewCVComponent} from "./candidates/view-cv/view-cv.component";
import { CandidateStatusComponent } from './candidates/candidate-status/candidate-status.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../../authentication/interceptor/auth.interceptor";
import {CustomInterceptor} from "../../authentication/interceptor/custom.interceptor";


@NgModule({
  declarations: [
    CandidatesComponent,
    AnalyseComponent,
    ViewCVComponent,
    CandidateStatusComponent
  ],
  exports: [
    ViewCVComponent
  ],
  imports: [
    CommonModule,
    CandidateFeatureRoutingModule,
    SharedModule,
    MatSidenavModule,
  ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: CustomInterceptor,
  //     multi: true
  //   }
  // ]
})
export class CandidateFeatureModule { }
