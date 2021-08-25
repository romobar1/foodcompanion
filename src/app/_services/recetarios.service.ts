import { Injectable } from "@angular/core";
import { Receta } from '../interfaces/receta';
import{ Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
    providedIn: 'root'
})
export class recetarioService{
    private apiServletUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){}


    public getRecetariosFromUser(userId: number): Observable<any> {
        return this.http.get(`${this.apiServletUrl}/recetario/user/${userId}`)
    }

    public addRecetaToRecetario(recetarioId: number, recetaId: number): Observable<any> {
        return this.http.put<any>(`${this.apiServletUrl}/recetario/${recetarioId}/receta/${recetaId}` , httpOptions)
    }

    public deleteRecetario(recetarioId: number): Observable<any> {
        return this.http.delete(`${this.apiServletUrl}/recetario/delete/${recetarioId}`)
    }

    public addRecetario(userId: number, recetario: any): Observable<any> {
        return this.http.post(`${this.apiServletUrl}/recetario/add/${userId}`,recetario, httpOptions)
    }

}

///{recetarioId}/receta/{recetaId}