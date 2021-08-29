import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/interfaces/receta';
import { recetaService } from 'src/app/_services/receta.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private recetaService: recetaService) { }
  recetas!: Receta[];
  keyword = 'title';
  ngOnInit(): void {
    this.getallRecetas()
  }
  public getallRecetas(){
    this.recetaService.getAllReceta().subscribe(
      Response => {
        this.recetas = Response._embedded.recetaList;
      },
      err=>{
        alert("Algo ha salido mal")
      }
  )
  }
}
