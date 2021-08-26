import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

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

  constructor(private tokenStorageService: TokenStorageService, private router: Router,private dataSharingService: DataSharingService ){
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

      let localUserIsLogged = sessionStorage.getItem("isUserLogged"); 
      if(localUserIsLogged==="yes"){
        this.isUserLoggedIn = true
      }
    }
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(["/login"])
    this.someMethodThatPerformsUserLogin()
  }
  reloadPage(): void {
    window.location.reload();
  }
  
  someMethodThatPerformsUserLogin() {
    window.sessionStorage.removeItem("isUserLogged")
    this.dataSharingService.isUserLoggedIn.next(false);
}


}
