import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './dtos/helper';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	public isLoggedinSubject = new Subject<Boolean>();

	constructor(private http: HttpClient) {}

	public getCurrentUser() {
		return this.http.get(`${baseUrl}/current-user`);
	}

	public generateToken(loginData: any) {
		return this.http.post(`${baseUrl}/generate-token`, loginData);
	}
	// Login user: Store data in local storage
	public loginUser(token: any) {
		localStorage.setItem('token', token);
		return true;
	}
	public isLoggedin() {
		let token = localStorage.getItem('token');
		if (token == undefined || token == '' || token == null) {
			return false;
		}
		return true;
	}

	// LogOut: Remove the token from local storage
	public logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('userDetail');
		return true;
	}

	// Get tokens
	public getToken() {
		return localStorage.getItem('token');
	}

	// Save user detail in local storage
	public setUserDetail(userDetail: any) {
		localStorage.setItem('userDetail', JSON.stringify(userDetail));
		return true;
	}

	// Get user details
	public getUserDetails() {
		let user = localStorage.getItem('userDetail');
		if (user == undefined || user == '' || user == null) {
			this.logout();
			return null;
		} else {
			return JSON.parse(user);
		}
	}

	// Get user role
	public getUserRole() {
		return this.getUserDetails().authorities[0].authority;
	}
}
