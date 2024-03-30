import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { endpoints } from 'src/app/core/enpoints/endPoints';
import { NotificationUser } from 'src/app/core/model/NotificationReq';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  requesNotificationSubject: Subject<any> = new Subject<any>()
  requestNotification$ = this.requesNotificationSubject.asObservable()

  constructor(private http: HttpClient) { }

  pushRequestNotification(notification: NotificationUser): Observable<any>{
    this.requesNotificationSubject.next(notification);
    return this.http.post<any>(`${endpoints.pushNotificationUser}`, notification)
  }

  getMyRequestNotifications(username: string): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.myReqNotifications}/${username}`)
  }

  
}
