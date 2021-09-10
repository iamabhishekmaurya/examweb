import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { CATEGORY } from 'src/app/services/dtos/comman.dto';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-add-category',
	templateUrl: './add-category.component.html',
	styleUrls: [ './add-category.component.css' ]
})
export class AddCategoryComponent implements OnInit {
	constructor(
		private categoryService: CategoryService,
		private snack: MatSnackBar,
		private loginService: LoginService
	) {}

	public category = CATEGORY;
	request = { category: this.category };
	ngOnInit(): void {}

	// add new category
	public addCategory() {
		if (this.category.title.trim() == '' || this.category.title == null) {
			this.snack.open('Please enter title.', 'ok', { duration: 3000 });
			return;
		}
		if (this.category.description.trim() == '' || this.category.description == null) {
			this.snack.open('Please enter descreption.', 'ok', { duration: 3000 });
			return;
		}
		let currentUser = this.loginService.getUserDetails();
		console.log(currentUser.userId);

		this.category.userId = currentUser.userId;
		this.request.category = this.category;
		this.categoryService.addCategory(this.request).subscribe(
			(data: any) => {
				console.log(data);
				if (data.status == 'APP001') {
					Swal.fire('Success', data.message, 'success');
					this.category.description = '';
					this.category.userId = '';
					this.category.title = '';
					this.category.status = false;
				} else {
					Swal.fire('Error', data.message, 'error');
				}
			},
			(error: any) => {
				console.log(error);
			}
		);
	}
}
