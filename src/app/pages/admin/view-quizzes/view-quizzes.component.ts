import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QUIZ } from 'src/app/services/dtos/comman.dto';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-view-quizzes',
	templateUrl: './view-quizzes.component.html',
	styleUrls: [ './view-quizzes.component.css' ]
})
export class ViewQuizzesComponent implements OnInit {
	constructor(private quizService: QuizService, private snack: MatSnackBar) {}
	public quizzes: any = QUIZ;
	panelOpenState = false;

	ngOnInit(): void {
		this.quizService.findAllQuizzes().subscribe(
			(data: any) => {
				console.log(data);
				if (data.status == 'APP001') {
					this.quizzes = data.quizzes;
				} else {
					// Swal.fire('Error', data.message, 'error');
					this.snack.open(data.message, 'ok', { duration: 3000 });
				}
			},
			(error) => {
				console.log(error);
				this.snack.open('Server error.', 'ok', { duration: 3000 });
			}
		);
	}
}
