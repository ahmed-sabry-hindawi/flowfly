import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    constructor(
        @Inject('BASE_API_URL') private baseUrl: string) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.startsWith('http')) {

            const apiReq = request.clone({ url: `${request.url}` });
            return next.handle(apiReq);
        }
        else {
            const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
            return next.handle(apiReq);
        }
    }

}