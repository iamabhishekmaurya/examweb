import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './dtos/helper';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) {}

	public createUser(user: any) {
		return this.http.post(`${baseUrl}/create/User`, user);
	}
}
