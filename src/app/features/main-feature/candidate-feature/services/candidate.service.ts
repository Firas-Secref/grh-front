import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {endpoints} from "../../../../core/enpoints/endPoints";
import { Status } from 'src/app/core/model/Status';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getAllCandidates(): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.getCandidates}`)
  }

  analyseCv(cvPath: string): Observable<any>{
    const filePath= {path: cvPath}
    return this.http.post<any>(`${endpoints.analyse}`,filePath)
  }

  addFeedBack(feedBack: any):Observable<any>{
    return this.http.post<any>(`${endpoints.newFeedback}`, feedBack)
  }

  getCandidateFeedBacks(candidateId: number): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.candidateFeedBack}/${candidateId}`)
  }

  updateCandidateStatus(candidateId: number, status: Status):Observable<any>{
    return this.http.post<any>(`${endpoints.updateCandidateStatus}/${candidateId}`, status);
  }

  getNewCandidate(): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.getNewCandidates}`)
  }

}
