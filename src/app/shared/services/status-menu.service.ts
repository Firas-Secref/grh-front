import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatusMenuService {

  private _source = new Subject<any>()
  message$ = this._source.asObservable();

  constructor() { }

  sendData(data: any){
    this._source.next(data)
  }

}
