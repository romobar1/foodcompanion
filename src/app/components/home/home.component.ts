import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/interfaces/receta';
import { recetaService } from '../../_services/receta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public recetas!: Receta[];

  constructor(private recetaService: recetaService) { }

  ngOnInit(): void {
    this.getReceta();
  }
  public getReceta(){
    this.recetaService.getAllReceta().subscribe(
         response =>{
          this.recetas = response._embedded.recetaList;
      },
      (error: HttpErrorResponse) =>{
          alert(error.message);
      }
      );
  }

  
}
