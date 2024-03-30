import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../../../../core/model/Event";
import {endpoints} from "../../../../core/enpoints/endPoints";
import {Interview} from "../../../../core/model/Interview";

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http: HttpClient) { }

  addNewEvent(event: Event): Observable<Event>{
    console.log(event)
    return this.http.post<Event>(`${endpoints.newEvent}`, event)
  }

  getAllEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(`${endpoints.allEvents}`)
  }

  updateCurrentEvent(eventId: number, newEvent: Event): Observable<Event>{
    return this.http.post<Event>(`${endpoints.updateEvent}/${eventId}`, newEvent)
  }

  addNewInterview(interview: Interview): Observable<any>{
    return this.http.post<Interview>(`${endpoints.newInterview}`, interview)
  }

  getAllInterviews(): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.allInterviews}`)
  }
}
