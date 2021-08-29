import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserControlService {

  constructor(private token: TokenStorageService) { }

  isLogged(){
    return !!sessionStorage.getItem("auth-token")
  }
}
