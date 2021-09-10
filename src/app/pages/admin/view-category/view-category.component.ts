import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { CATEGORY } from 'src/app/services/dtos/comman.dto';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-view-category',
	templateUrl: './view-category.component.html',
	styleUrls: [ './view-category.component.css' ],
	encapsulation: ViewEncapsulation.None
})
export class ViewCategoryComponent implements OnInit {
	constructor(private categoryService: CategoryService, private snack: MatSnackBar) {}
	public categoryList = [ CATEGORY ];
	ngOnInit(): void {
		this.categoryService.getAllCategories().subscribe(
			(data: any) => {
				console.log(data);
				this.categoryList = data.categoryList;
			},
			(error) => {
				console.log(error);
				this.snack.open(error.message, 'ok', { duration: 3000 });
			}
		);
	}

	public catAction(catId: any) {
		console.log(catId);
		if (catId > 0) {
			let request = { filter: { id: catId } };
			this.categoryService.activateAndDiactivateCtageory(request).subscribe((data: any) => {
				console.log(data);
				if (data.status == 'APP001') {
					Swal.fire('Success', data.message, 'success');
					console.log(data.category.catId);
					this.ngOnInit();
				} else {
					Swal.fire('Error', data.message, 'error');
				}
			});
		}
	}
}
