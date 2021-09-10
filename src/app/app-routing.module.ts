import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full'
	},
	{
		path: 'signup',
		component: SignupComponent,
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		pathMatch: 'full'
	},
	{
		path: 'admin',
		component: AdminDashboardComponent,
		// pathMatch: 'full',
		// canActivate: [ AdminGuard ],
		children: [
			{ path: '', component: AdminHomeComponent },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'category', component: ViewCategoryComponent },
			{ path: 'addcategory', component: AddCategoryComponent },
			{ path: 'quizzes', component: ViewQuizzesComponent },
			{ path: 'addquiz', component: AddQuizComponent }
		]
	},
	{
		path: 'user',
		component: UserDashboardComponent,
		pathMatch: 'full',
		canActivate: [ UserGuard ]
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
