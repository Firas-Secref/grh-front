import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { RegisterCandidateComponent } from './register-candidate/register-candidate.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, 
  {
    path: 'registerCondidate',
    component: RegisterCandidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
