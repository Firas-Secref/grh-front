import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endWith } from 'rxjs/operators';
import { endpoints } from 'src/app/core/enpoints/endPoints';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  public postuler(candidateOfferObject: any): Observable<any>{
    return this.http.post(`${endpoints.postuler}`, candidateOfferObject)
  }

  public getMyCandidacys(candidateId: number): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.getMyCandidacys}/${candidateId}`)
  }

  public getAllCandidacys(): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.getAllCandidacys}`)
  }

  public showPostDetails(postId: number):Observable<any>{
    return this.http.get<any>(`${endpoints.getJobDetails}/${postId}`)
  }

  public uploadCvFile(fileFormData: FormData): Observable<any>{
    return this.http.post<any>(`${endpoints.uploadCv}`, fileFormData)
  }

  public getAllCandidate():Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.candidates}`)
  }

  public sendMessage(messageObject: any): Observable<any>{
    return this.http.post<any>(`${endpoints.sendNewMessage}`, messageObject)
  }

  public getMessagesUser(username : string): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.getMyMessageUser}/${username}`)
  }

  public getMessagescandidate(candidateId : number): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.getMyMessageCandidate}/${candidateId}`)
  }

  public loadConversation(fromUser: number, toUser: string):Observable<any[]>{
    return this.http.get<any>(`${endpoints.loadConversation}/${fromUser}/${toUser}`)
  }
}
