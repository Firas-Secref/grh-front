import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewUser} from "../../../../core/model/NewUser";
import {Observable} from "rxjs";
import {endpoints} from "../../../../core/enpoints/endPoints";
import {UserItem} from "../../../../core/model/UserItem";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public addNewUser(formdata: FormData): Observable<any>{
    return this.http.post<any>(`${endpoints.newUser}`, formdata);
  }

  public addRoleToUser(username: string, roleName: string): Observable<any>{
    return this.http.post<any>(`${endpoints.addRoleToUser}`, {username: username, roleName: roleName})
  }

  public getAllUsers(username: string): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.getAllUsers}/${username}`)
  }

  public getCurrentUser(username: string): Observable<UserItem>{
    return this.http.get<any>(`${endpoints.getUserByUsername}/${username}`)
  }

  public getCurrentCandidate(username: string):Observable<any>{
    return this.http.get<any>(`${endpoints.candidateByUsername}/${username}`)
  }

  public getOnlyRhUsers(username: string): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.getOnlyRhUsers}/${username}`)
  }

  
}
