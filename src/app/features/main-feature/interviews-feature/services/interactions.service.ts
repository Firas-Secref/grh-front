import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  toastSubject = new Subject<boolean>();
  toastObservable$ = this.toastSubject.asObservable()
  constructor() { }

  pushToast(data: any){
    this.toastSubject.next(data)
  }
}
