import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpResponse,
  HttpSentEvent,
  HttpProgressEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';





@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {

   }

    intercept(req: HttpRequest < any >, next: HttpHandler): 
    Observable < HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent < any >> {    
      return next.handle(req).pipe(      
        catchError((err: HttpErrorResponse) => this.handleData(err))
      );
  
  }
  
  private handleData(
    event: HttpErrorResponse ,
  ): Observable<any> {
 
    switch (event.status) {
      
      case 403:
       
          this.confirmationService.confirm({
            message: "登录过期，请重新登录！",
            header: '提示',
            icon: 'pi pi-info-circle',
            
            acceptLabel: '确认',
            rejectVisible: false,
            accept: () => {
              this.router.navigate(['/login']);
            },
            key: "positionDialog"
          });
       
        return of(event);
        break;
      case 500:

        this.confirmationService.confirm({
          message: "服务器错误，请重试！",
          header: '提示',
          icon: 'pi pi-info-circle',

          acceptLabel: '确认',
          rejectVisible: false,
         
          key: "positionDialog"
        });

        return of(event);
        break;
      default:
    }
    return throwError(event);
  }

}
  

