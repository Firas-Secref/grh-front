import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url ==="https://api.duetodata.com/admin/candidates-infos"){
      return next.handle(request)
    }
    else{
      let authService = this.injector.get(LoginService)
      // let jwt :string = localStorage.getItem("token")!
      let tokenizedReq = request.clone({
        setHeaders: {
          Authorization: authService.getToken()
        }
      });
      return next.handle(tokenizedReq );
    }
  }


}
