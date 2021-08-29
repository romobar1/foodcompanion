import { Component, ErrorHandler, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ForoComponent } from './components/foro/foro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecetaComponent } from './components/receta/receta.component';
import { UserControlGuard } from './_services/user-control.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path:"", component: HomeComponent},
  {path:'profile', component: ProfileComponent, canActivate:[UserControlGuard]},
  {path:'receta', component: RecetaComponent},
  {path:'register', component: FormUserComponent},
  {path:'foro', component: ForoComponent},
  {path: 'post', component: PostComponent},
  {path: 'error', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }