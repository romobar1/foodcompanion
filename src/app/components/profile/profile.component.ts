import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/interfaces/receta';
import { TokenStorageService } from '../../_services/token-storage.service';
import { recetaService } from '../../_services/receta.service';
import { Recetario } from 'src/app/interfaces/recetario';
import { recetarioService } from 'src/app/_services/recetarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  isRecetasEmpty = false;
  isRecetariosEmpty = false;

  public recetas!: Receta[];
  public recetarios!: Recetario[];

  constructor(private token: TokenStorageService, private recetaService: recetaService, private recetarioService: recetarioService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getRecetasFromUser();
    this.getRecetariosFromUser()
  }

  public getRecetasFromUser(){
    this.recetaService.getRecetasFromUser(this.currentUser.id).subscribe(
         response =>{
          if(Object.keys(response).length  ===  1 ){
          this.isRecetasEmpty = true;
          }
          this.recetas = response._embedded.recetaList;
          this.isRecetasEmpty = false;
          //alert("va");
      },
      (error: HttpErrorResponse) =>{
          alert(error.message);
      }
      );
  }
  public deleteRecetasFromUser(recetaId: number){
    this.recetaService.deleteReceta(recetaId).subscribe(
         response =>{
          alert("La receta ha sido borrada con exito!")
          location.reload(); 
      },
      (error: HttpErrorResponse) =>{
          alert(error.message);
      }
      );
  }
  public getRecetariosFromUser(){
    this.recetarioService.getRecetariosFromUser(this.currentUser.id).subscribe(
         response =>{
          if(Object.keys(response).length  ===  1 ){
          this.isRecetariosEmpty = true;
          }
          this.recetarios = response._embedded.recetarioList;
          this.isRecetariosEmpty = false;
          //alert("va");
      },
      (error: HttpErrorResponse) =>{
          alert(error.message);
      }
      );
  }

  public deleteRecetarioFromUser(recetarioId: number){
    this.recetarioService.deleteRecetario(recetarioId).subscribe(
         response =>{
          alert("El recetario ha sido borrada con exito!")
          location.reload(); 
      },
      (error: HttpErrorResponse) =>{
          alert(error.message);
      }
      );
  }


}
