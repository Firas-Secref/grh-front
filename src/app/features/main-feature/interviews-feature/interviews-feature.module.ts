import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewsFeatureRoutingModule } from './interviews-feature-routing.module';
import {InterviewsComponent} from "./interviews/interviews.component";
import {SharedModule} from "../../../shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../../authentication/interceptor/auth.interceptor";
import { NewInterviewComponent } from './interviews/new-interview/new-interview.component';
import {DialogService} from "primeng/dynamicdialog";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import { NewEventComponent } from './interviews/new-event/new-event.component';
import { EventsOptionComponent } from './interviews/events-option/events-option.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import {TabViewModule} from 'primeng/tabview';
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    InterviewsComponent,
    NewInterviewComponent,
    NewEventComponent,
    EventsOptionComponent
  ],
  imports: [
    CommonModule,
    InterviewsFeatureRoutingModule,
    SharedModule,
    SlideMenuModule,
    TabViewModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DialogService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    MessageService
  ]
})
export class InterviewsFeatureModule { }
