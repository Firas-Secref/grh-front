import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsFeatureRoutingModule } from './posts-feature-routing.module';
import {PostsComponent} from "./posts/posts.component";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import { PostMenuStatusComponent } from './posts/post-menu-status/post-menu-status.component';


@NgModule({
  declarations: [
    PostsComponent,
    PostMenuStatusComponent
  ],
    imports: [
        CommonModule,
        PostsFeatureRoutingModule,
        SharedModule,
        FormsModule
    ],

})
export class PostsFeatureModule { }
