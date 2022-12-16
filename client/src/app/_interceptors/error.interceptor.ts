import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toast : ToastrService) {}
  
  /**
   * 
   * @param request - an http request called request
   * @param next - what happens next from HttpHandler
   * @returns - httpClient returns an observable
   * In order to transform or modify an observable, we use pipe() method from 'rxjs'
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            
            case 400: 
              if (error.error.errors) {
                const modelStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key])
                  }
                }
                throw modelStateErrors.flat();
              }
              else {
                this.toast.error(error.error, error.status.toString())
              }
              break;

            case 401:
              this.toast.error('Unauthorized', error.status.toString());
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras : NavigationExtras = {state : {error:error.error}};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toast.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }
        throw error;
      }
      )
    )
  }
}
