import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, provideRoutes, Router } from '@angular/router';
import { Comentario } from 'src/app/interfaces/comentario';
import { Receta } from 'src/app/interfaces/receta';
import { ComentariosService } from 'src/app/_services/comentarios.service';
import { recetaService } from 'src/app/_services/receta.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

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
  recetaId: number = 0;
  constructor(
     private recetaService: recetaService,
     private route : ActivatedRoute,
     private comentService: ComentariosService,
     private token: TokenStorageService,
     ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.route.queryParams.subscribe( params =>{
        this.recetaId = params['recetaId'];
        this.form.body = "";
        this.form.userName = this.currentUser.username;
    })

    this.recetaService.getReceta(this.recetaId).subscribe(
        data =>{
          this.receta = data;
        }
    )
    this.comentService.getAllComentsByRecetaId(this.recetaId).subscribe(
      data =>{
        this.comentario = data._embedded.comentarioList;
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
        alert("Receta dada de alta con exito!")
      }
    )
  }
}
