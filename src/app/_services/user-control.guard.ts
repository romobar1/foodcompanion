import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserControlService } from './user-control.service';

@Injectable({
  providedIn: 'root'
})
export class UserControlGuard implements CanActivate {
  constructor(private userControl: UserControlService, private route : Router){}
  canActivate(){
    if(this.userControl.isLogged()){
      return true;
    }else{
      this.route.navigate(['login']);
      return false;
    } 
    
  }
    
}
