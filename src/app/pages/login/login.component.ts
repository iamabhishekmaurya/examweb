import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) {}
	public user = {
		username: '',
		password: ''
	};
	ngOnInit(): void {}

	login() {
		console.log('login butten clicked!');
		if (this.user.username.trim() == '' || this.user.username == null) {
			this.snack.open('Username is required!', 'ok', { duration: 3000 });
			return;
		}
		if (this.user.password.trim() == '' || this.user.password == null) {
			this.snack.open('Password is required!', 'ok', { duration: 3000 });
			return;
		}

		// Request to server to generate JWT token
		this.loginService.generateToken(this.user).subscribe(
			(data: any) => {
				console.log('Token Generation success!');
				console.log(data);
				// Login
				this.loginService.loginUser(data.token);
				this.loginService.getCurrentUser().subscribe((user: any) => {
					this.loginService.setUserDetail(user);
					console.log(user);
					// redirect the user on the basice of user role
					if (this.loginService.getUserRole() == 'ADMIN') {
						this.router.navigate([ 'admin' ]);
						this.loginService.isLoggedinSubject.next(true);
						// window.location.href = '/admin';
					} else if (this.loginService.getUserRole() == 'NORMAL_USER') {
						// window.location.href = '/user';
						this.router.navigate([ 'user' ]);
						this.loginService.isLoggedinSubject.next(true);
					} else {
						this.loginService.logout();
						// location.reload();
					}
				});
			},
			(error) => {
				console.log('Erroe!!!!: ', error);
				this.snack.open('Invalid Detail, Try Again!', 'ok', { duration: 3000 });
			}
		);
	}
}
