import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersFeatureRoutingModule } from './users-feature-routing.module';
import {UsersComponent} from "./users/users.component";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {PasswordModule} from 'primeng/password';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CustomInterceptor} from "../../authentication/interceptor/custom.interceptor";
import {AuthInterceptor} from "../../authentication/interceptor/auth.interceptor";


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersFeatureRoutingModule,
    SharedModule,
    FormsModule,
    PasswordModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
    // {
      // provide: HTTP_INTERCEPTORS,
      // useClass: AuthInterceptor,
      // multi: true
      // }
  ]

})
export class UsersFeatureModule { }
