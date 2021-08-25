import { Injectable } from "@angular/core";
import{ Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
    providedIn: 'root'
})
export class ComentariosService{
    private apiServletUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){}

    public getAllComentsByRecetaId(recetaid: number): Observable<any> {
        return this.http.get<any>(`${this.apiServletUrl}/comentario/user/${recetaid}/all`)
    }


    public addComentario(comentario: any, coment: Number): Observable<any> {
        return this.http.post<any>(`${this.apiServletUrl}/comentario/add/${coment}`, comentario , httpOptions)
    }

}