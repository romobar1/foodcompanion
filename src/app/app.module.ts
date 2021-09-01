import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule  } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { RecetaComponent } from './components/receta/receta.component';
import { FormRecetaComponent } from './components/form-receta/form-receta.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { FormRecetarioComponent } from './components/form-recetario/form-recetario.component';
import { FormEditRecetaComponent } from './components/form-edit-receta/form-edit-receta.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormAddToRecetarioComponent } from './components/form-add-to-recetario/form-add-to-recetario.component';
import { ForoComponent } from './components/foro/foro.component';
import { ForoFormComponent } from './components/foro-form/foro-form.component';
import { PostComponent } from './components/post/post.component';
import { FormReplyComponent } from './components/form-reply/form-reply.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FormUpdatePasswordComponent } from './components/form-update-password/form-update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    RecetaComponent,
    FormRecetaComponent,
    FormRecetarioComponent,
    FormEditRecetaComponent,
    FormUserComponent,
    FormAddToRecetarioComponent,
    ForoComponent,
    ForoFormComponent,
    PostComponent,
    FormReplyComponent,
    ErrorPageComponent,
    SearchBarComponent,
    FormUpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  providers: [DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
