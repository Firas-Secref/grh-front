import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {endpoints} from "../../../../core/enpoints/endPoints";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  loadUserByUsername(username: string): Observable<any>{
    return this.http.get<any>(`${endpoints.getUserByUsername}/${username}`)
  }

  updateUserProfile(userId: number, user: FormData): Observable<any>{
    return this.http.post<any>(`${endpoints.updateUserProfile}/${userId}`, user);
  }
}
