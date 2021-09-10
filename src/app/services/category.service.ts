import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './dtos/helper';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	constructor(private http: HttpClient) {}

	public getAllCategories() {
		return this.http.get(`${baseUrl}/list/Category`);
	}

	public addCategory(category: any) {
		return this.http.post(`${baseUrl}/create/Category`, category);
	}

	public activateAndDiactivateCtageory(catId: any) {
		return this.http.post(`${baseUrl}/delete/Category`, catId);
	}
}
