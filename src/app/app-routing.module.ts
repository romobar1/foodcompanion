import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecetaComponent } from './components/receta/receta.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path:"", component: HomeComponent},
  {path:'profile', component: ProfileComponent},
  {path:'receta', component: RecetaComponent},
  {path:'register', component: FormUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }