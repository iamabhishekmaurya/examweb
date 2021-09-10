import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
	constructor(public loginService: LoginService) {}
	public isLoggedin = false;
	public username = '';

	ngOnInit(): void {
		this.isLoggedin = this.loginService.isLoggedin();
		if (this.loginService.getUserDetails() != null) {
			this.username = this.loginService.getUserDetails().username;
		}
		this.loginService.isLoggedinSubject.asObservable().subscribe((data) => {
			this.isLoggedin = this.loginService.isLoggedin();
			if (data) {
				this.username = this.loginService.getUserDetails().username;
			}
		});
	}

	public logout() {
		this.loginService.logout();
		window.location.reload();
	}
}
