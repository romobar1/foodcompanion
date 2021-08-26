import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  form: any ={
    username : null,
    email: null,
    password: null
  }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private autService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    this.autService.register(this.form.username, this.form.email, this.form.password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        alert("Cuenta dada de alta con exito")
        this.router.navigate(["/login"])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
