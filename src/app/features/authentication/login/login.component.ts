import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Login} from "../../../core/model/Login";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "primeng/dynamicdialog";
import {ErrorModalComponent} from "../error-modal/error-modal.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  helper = new JwtHelperService()
  loginForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private loginService: LoginService, private router: Router,
              private dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit(): void {
    localStorage.removeItem("token")
    this.initForm()
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })
  }

  login() {
    const credentials = new Login(this.loginForm.value.username, this.loginForm.value.password)
    this.loginService.login(credentials).subscribe(response=>{
      const JWT = response.headers.get("authorization")
      const decodedJWT = this.helper.decodeToken(JWT)
      localStorage.setItem("token", JWT)
      localStorage.setItem("role", decodedJWT.roles[0])

      this.router.navigate(['/home'])
    },
      (error: HttpErrorResponse) => {
        this.showConfirm();
      })
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'failed', sticky: true, severity:'error', summary:'Are you sure?', detail:'Confirm to proceed'});
  }

  onConfirm() {
    this.messageService.clear('failed');
  }
}
