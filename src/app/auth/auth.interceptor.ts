import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestURL=req.url;         //For git backend
        if(requestURL.indexOf('@api-x') !== -1){
            requestURL=requestURL.replace('@api-x/https://20.197.56.146/api/v4','https://20.197.56.146/api/v4');
            req=req.clone({
                url:requestURL,
                headers: req.headers.set('Authorization','Bearer '+ '493rDyBuzt4iVLAYpfbH')
            })
            return next.handle(req.clone());
        }
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401) { localStorage.removeItem('token');this.router.navigateByUrl('/user/login') }
                        else if (err.status == 403) { this.router.navigateByUrl('/forbidden') }

                    }
                ))
        } else { return next.handle(req.clone()) }
    }

}