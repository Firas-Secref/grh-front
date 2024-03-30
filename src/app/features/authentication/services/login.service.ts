import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {endpoints} from "../../../core/enpoints/endPoints";
import {Login} from "../../../core/model/Login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(credentials: Login): Observable<any>{
    return this.http.post<any>(`${endpoints.login}`, credentials, {observe: 'response'})
  }

  public loggedIn(){
    return !!localStorage.getItem("token")
  }

  public getToken(){
    return localStorage.getItem("token")||"";
  }
}
