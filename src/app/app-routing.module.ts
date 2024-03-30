import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./features/main-feature/main/main.component";
import {AuthGuard} from "./features/authentication/guard/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=>import('./features/authentication/authentication.module').then(m=>m.AuthenticationModule),
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'candidates',
        loadChildren: ()=>import('./features/main-feature/candidate-feature/candidate-feature.module').then(m=>m.CandidateFeatureModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'posts',
        loadChildren: ()=>import('./features/main-feature/posts-feature/posts-feature.module').then(m=>m.PostsFeatureModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'requests',
        loadChildren: ()=>import('./features/main-feature/requests-feature/requests-feature.module').then(m=>m.RequestsFeatureModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'interviews',
        loadChildren: ()=>import('./features/main-feature/interviews-feature/interviews-feature.module').then(m=>m.InterviewsFeatureModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manageUsers',
        loadChildren: ()=>import('./features/main-feature/users-feature/users-feature.module').then(m=>m.UsersFeatureModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        loadChildren: ()=>import('./features/main-feature/dashboard/dashboard.module').then(m=>m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: ()=>import('./features/main-feature/profile-feature/profile-feature.module').then(m=>m.ProfileFeatureModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'messages',
        loadChildren: ()=>import('./features/main-feature/messages/messages.module').then(m=>m.MessagesModule),
        canActivate: [AuthGuard]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
