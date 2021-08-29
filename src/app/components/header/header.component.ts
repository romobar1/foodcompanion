import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { UserControlService } from 'src/app/_services/user-control.service';
import { Receta } from 'src/app/interfaces/receta';
import { recetaService } from 'src/app/_services/receta.service';
import { recetarioService } from 'src/app/_services/recetarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBroad = false;
  showModeratorBoard = false;
  username?:string;
  isUserLoggedIn: boolean = false;
  recetas!: Receta[];
  constructor(private tokenStorageService: TokenStorageService, 
              private router: Router,private dataSharingService: DataSharingService, 
              private userControl: UserControlService,
              private recetaService: recetaService ){
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });

  }
  ngOnInit(): void{
    this.isLoggedIn= !!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;

        this.showAdminBroad = this.roles.includes('ROLE_ADMIN')
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.isUserLoggedIn = this.userControl.isLogged();
    }
  
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(["/login"])
    this.sendLogin()
  }
  reloadPage(): void {
    window.location.reload();
  }
  
  sendLogin() {
    this.dataSharingService.isUserLoggedIn.next(false);
  }
  
}
