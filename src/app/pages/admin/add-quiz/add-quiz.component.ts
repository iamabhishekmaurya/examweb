import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QUIZ } from 'src/app/services/dtos/comman.dto';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-add-quiz',
	templateUrl: './add-quiz.component.html',
	styleUrls: [ './add-quiz.component.css' ]
})
export class AddQuizComponent implements OnInit {
	constructor(
		private snack: MatSnackBar,
		private quizService: QuizService,
		private categoryService: CategoryService,
		private loginService: LoginService
	) {}
	public quizzes = QUIZ;
	public categories: any;
	ngOnInit(): void {
		this.categoryService.getAllCategories().subscribe(
			(data: any) => {
				console.log(data);
				if (data.status == 'APP001') {
					this.categories = data.categoryList;
				} else {
					this.snack.open(`CategoryList: ${data.message}`, 'ok', { duration: 3000 });
				}
			},
			(error) => {
				console.log(error);
				this.snack.open('Server error.', 'ok', { duration: 3000 });
			}
		);
	}

	public saveQuiz() {
		if (this.quizzes.title == '') {
			this.snack.open('Title is required!', 'ok', { duration: 3000 });
			return;
		}
		if (this.quizzes.maxMark == '') {
			this.snack.open('MAx Mark is required!', 'ok', { duration: 3000 });
			return;
		}
		if (this.quizzes.catId == '') {
			this.snack.open('Please select category!', 'ok', { duration: 3000 });
			return;
		}
		if (this.quizzes.numberOfQuestion == '') {
			this.snack.open('Total number of question is required!', 'ok', { duration: 3000 });
			return;
		}
		let user: any = this.loginService.getUserDetails();
		this.quizzes.userId = user.userId;
		let request = { quiz: this.quizzes };
		this.quizService.addQuiz(request).subscribe(
			(data: any) => {
				if (data.status == 'APP001') {
					Swal.fire('Success', data.message, 'success');
					this.quizzes = QUIZ;
				} else {
					this.snack.open(data.message, 'ok', { duration: 3000 });
				}
			},
			(error) => {
				console.log(error);
				Swal.fire('Error', 'Server Error!', 'error');
			}
		);
	}
}
