import { Injectable } from "@angular/core";
import { Receta } from '../interfaces/receta';
import{ Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Foro } from "../interfaces/foro";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
    providedIn: 'root'
})
export class foroService{
    private apiServletUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){}

    public getForo(): Observable<Foro> {
        return this.http.get<Foro>(`${this.apiServletUrl}/forum/find/1`)
    }


}