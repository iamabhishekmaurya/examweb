import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './dtos/helper';

@Injectable({
	providedIn: 'root'
})
export class QuizService {
	constructor(public http: HttpClient) {}

	public findAllQuizzes() {
		return this.http.get(`${baseUrl}/list/Quiz`);
	}

	public addQuiz(request: any) {
		return this.http.post(`${baseUrl}/create/Quiz`, request);
	}
}
