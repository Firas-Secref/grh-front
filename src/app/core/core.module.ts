import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './pages/start/start.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
      StartComponent,
    ],
    exports: [
      StartComponent,
    ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
