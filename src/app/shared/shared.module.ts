import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material components
import {MatButtonModule} from "@angular/material/button";
import { MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDividerModule} from '@angular/material/divider';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SideBarComponent } from './side-bar/side-bar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import { ChipsModule } from 'primeng/chips';

// PRIME NG components

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from "primeng/button";
import {AvatarModule} from 'primeng/avatar';
import {BadgeModule} from 'primeng/badge';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {InputTextModule} from 'primeng/inputtext';
import {OrderListModule} from 'primeng/orderlist';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SelectButtonModule} from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import {FieldsetModule} from 'primeng/fieldset';
import {DividerModule} from 'primeng/divider';
import {CheckboxModule} from 'primeng/checkbox';


import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HeaderComponent } from './header/header.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import { TwoFirstLettersPipe } from './pipes/two-first-letters.pipe';
import { TableModule } from 'primeng/table';
// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   interactionPlugin
// ]);

@NgModule({
  declarations: [
    SideBarComponent,
    NavbarComponent,
    HeaderComponent,
    TwoFirstLettersPipe,
  ],
  imports: [
    RippleModule,
    ToastModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    ScrollingModule,
    SidebarModule,
    ButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatToolbarModule,
    AvatarModule,
    BadgeModule,
    MatBadgeModule,
    MatListModule,
    MatCardModule,
    ScrollPanelModule,
    InputTextModule,
    MatSelectModule,
    OrderListModule,
    DropdownModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DialogModule,
    TimelineModule,
    CardModule,
    InputTextareaModule,
    SelectButtonModule,
    CalendarModule,
    FieldsetModule,
    DividerModule,
    CheckboxModule,
    FullCalendarModule,
    MatChipsModule,
    Ng2SearchPipeModule,
    ChipsModule,
    TableModule,
    FormsModule
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    ScrollingModule,
    SideBarComponent,
    SidebarModule,
    MatExpansionModule,
    NavbarComponent,
    MatMenuModule,
    MatToolbarModule,
    AvatarModule,
    BadgeModule,
    MatBadgeModule,
    MatListModule,
    MatCardModule,
    ScrollPanelModule,
    InputTextModule,
    MatSelectModule,
    OrderListModule,
    DropdownModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DialogModule,
    FormsModule,
    TimelineModule,
    CardModule,
    InputTextareaModule,
    SelectButtonModule,
    CalendarModule,
    FieldsetModule,
    DividerModule,
    CheckboxModule,
    FullCalendarModule,
    MatChipsModule,
    Ng2SearchPipeModule,
    TwoFirstLettersPipe,
    RippleModule,
    ToastModule,
    ChipsModule,
    TableModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService]

})
export class SharedModule { }
