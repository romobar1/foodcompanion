import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, provideRoutes, Router } from '@angular/router';
import { Comentario } from 'src/app/interfaces/comentario';
import { Receta } from 'src/app/interfaces/receta';
import { ComentariosService } from 'src/app/_services/comentarios.service';
import { recetaService } from 'src/app/_services/receta.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserControlService } from 'src/app/_services/user-control.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  currentUser: any;
   receta!: Receta;
   comentario!: Comentario[];
   form: any ={
     body: null,
     userName: null,
   }
   isUserLoggedIn!: boolean
  recetaId: number = 0;
  constructor(
     private recetaService: recetaService,
     private route : ActivatedRoute,
     private comentService: ComentariosService,
     private token: TokenStorageService,
     private sendTo: Router,
     private userControl: UserControlService
     ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params =>{
        this.recetaId = params['recetaId'];
        this.getReceta(this.recetaId);
    })
    this.isUserLoggedIn = this.userControl.isLogged();
    if(this.isUserLoggedIn == false){
      this.form.userName = 'Anónimo';
    }else{
      this.currentUser = this.token.getUser();
      this.form.userName = this.currentUser.username;
    }
    this.form.body = "";   
    
    this.comentService.getAllComentsByRecetaId(this.recetaId).subscribe(
      data =>{
        this.comentario = data._embedded.comentarioList;
      }
    )
  }
  public getReceta(id: number){
    this.recetaService.getReceta(id).subscribe(
      data =>{
        this.receta = data;
      },
      err=>{
        if(err.status==500){
          this.sendTo.navigate(['error'])
      }else if(err.status==404){
        this.sendTo.navigate(['error'])
      }
      }
  )
  }
  public save(){
    this.comentService.addComentario(this.form, this.recetaId).subscribe(
      (res: any) =>{
          alert("Comentario subido con exito");
          const currentRoute = this.route.url;
          location.reload(); 
      },
      (err: any) =>{
        alert("Algo a salido mal")
      }
    )
  }
}
