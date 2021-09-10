import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { USER } from 'src/app/services/dtos/comman.dto';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.css' ]
})
export class SignupComponent implements OnInit {
	constructor(private userService: UserService, private snackBar: MatSnackBar) {}

	public user = USER;
	public request = { user: this.user };

	ngOnInit(): void {}

	register() {
		if (this.user.username == '') {
			this.snackBar.open('Username is required!', 'ok', { duration: 3000 });
			return;
		}
		this.user.role = [ 2 ];
		this.request.user = this.user;
		console.log(this.request);

		// Create new user
		this.userService.createUser(this.request).subscribe(
			(data: any) => {
				console.log(data);
				Swal.fire('Success', data.message, 'success');
				this.user = USER;
			},
			(error) => {
				console.log(error.error.message);
				this.snackBar.open(error.error.message, 'ok', { duration: 5000 });
			}
		);
	}
}
