import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NavigationBarComponent } from './shared/components/navigation-bar/navigation-bar.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { AddEditUserComponent } from './shared/components/add-edit-user/add-edit-user.component';
import { authGuard } from './auth/constant/auth-guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'app', component: NavigationBarComponent,
    canActivateChild: [authGuard],
    children: [
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'user', component: UserProfileComponent },
      { path: 'add', component: AddEditUserComponent },
      { path: 'add/:userId', component: AddEditUserComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
