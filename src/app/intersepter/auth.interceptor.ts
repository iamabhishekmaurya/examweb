import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	TOKEN_HEADE = 'Authorization';
	constructor(private loginService: LoginService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Add jwt token from local storage to request
		const token = this.loginService.getToken();
		let authReq = req;
		if (token != null) {
			authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
		}
		return next.handle(authReq);
	}
}

export const authInterceptorProviders = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	}
];
