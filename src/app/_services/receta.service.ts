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
export class recetaService{
    private apiServletUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){}

    public getReceta(recetaid: number): Observable<Receta> {
        return this.http.get<Receta>(`${this.apiServletUrl}/receta/find/${recetaid}`)
    }
    
    
    public getAllReceta(): Observable<any> {
        return this.http.get(`${this.apiServletUrl}/receta/all`)
    }

    public getRecetasFromUser(userId: number): Observable<any> {
        return this.http.get(`${this.apiServletUrl}/receta/user/${userId}`)
    }

    public addReceta(receta: any, user: String): Observable<any> {
        return this.http.post<any>(`${this.apiServletUrl}/receta/add/user/${user}`, receta , httpOptions)
    }

    public deleteReceta(recetaId: number): Observable<any> {
        return this.http.delete(`${this.apiServletUrl}/receta/delete/${recetaId}`)
    }

    public updateReceta(form: Receta): Observable<any> {
        return this.http.put(`${this.apiServletUrl}/receta/update`, form ,httpOptions )
    }

}