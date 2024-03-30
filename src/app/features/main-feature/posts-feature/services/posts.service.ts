import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {endpoints} from "../../../../core/enpoints/endPoints";
import {HttpClient} from "@angular/common/http";
import {NewPost, PostDB} from "../../../../core/model/Post";
import {Status} from "../../../../core/model/Status";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  addNewOffer(offer: FormData): Observable<NewPost>{
    return this.http.post<NewPost>(`${endpoints.addNewOffer}`, offer);
  }

  getAllOffers(): Observable<PostDB[]>{
    return this.http.get<PostDB[]>(`${endpoints.getAllOffer}`)
  }

  updateOfferStatus(offerId: number, status: Status):Observable<any>{
    return this.http.post<any>(`${endpoints.updateOfferStatus}/${offerId}`, status);
  }



}
