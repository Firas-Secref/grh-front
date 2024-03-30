import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {MainComponent} from "./features/main-feature/main/main.component";
import {ProfileFeatureModule} from "./features/main-feature/profile-feature/profile-feature.module";
import {CandidateFeatureModule} from "./features/main-feature/candidate-feature/candidate-feature.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./features/authentication/interceptor/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        ProfileFeatureModule,
        CandidateFeatureModule,

    ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
