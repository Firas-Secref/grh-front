import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/core/enpoints/endPoints';

@Injectable({
  providedIn: 'root'
})
export class RegisterCandidateService {

  constructor(private http: HttpClient) { }

  register(candidate: any): Observable<any>{
    return this.http.post<any>(`${endpoints.saveCandidate}`, candidate);
  }

  public addSkillsToCandidate(CandidateSkillObject: any): Observable<any>{
    return this.http.post<any>(`${endpoints.addSkillToCandidate}`, CandidateSkillObject)
  }

}
