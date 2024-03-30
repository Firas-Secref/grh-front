import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {ProfileFeatureRoutingModule} from "./profile-feature-routing.module";
import {SharedModule} from "../../../shared/shared.module";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../../authentication/interceptor/auth.interceptor";



@NgModule({
  declarations: [
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileFeatureRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
    , JwtHelperService,

    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
]

})
export class ProfileFeatureModule { }
