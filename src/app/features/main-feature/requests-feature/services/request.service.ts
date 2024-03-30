import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Request} from "../../../../core/model/Request";
import {Observable} from "rxjs";
import {endpoints} from "../../../../core/enpoints/endPoints";
import {Department} from "../../../../core/model/Department";
import {RequestResp} from "../../../../core/model/RequestResp";
import {Status} from "../../../../core/model/Status";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public addNewRequest(request: FormData): Observable<any>{
    return this.http.post<any>(`${endpoints.addNewRequest}`,request )
  }

  public getDepartment(departmentName: string): Observable<Department>{
    return this.http.get<Department>(`${endpoints.getDepartmentByDepartmentName}/${departmentName}`)
  }

  public getAllRequests(): Observable<RequestResp[]>{
    return this.http.get<RequestResp[]>(`${endpoints.getAllRequests}`)
  }

  public updateRequestStatus(requestId: number, status: Status): Observable<any>{
    return this.http.post<any>(`${endpoints.updateRequestStatus}/${requestId}`, status)
  }
}
