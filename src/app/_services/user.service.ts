import { Injectable } from "@angular/core";
import { Usuario } from '../interfaces/usuario';
import{ Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
    providedIn: 'root'
})
export class usuarioService{
    private apiServletUrl = environment.apiBaseUrl;



    constructor(private http: HttpClient){}

    public getUsuario(usuarioid: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiServletUrl}/usuario/find/${usuarioid}`)
    }

    public addUsuario(Usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiServletUrl}/usuario/add/`, Usuario)
    }

    public updateUsuario(Usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiServletUrl}/usuario/update/`, Usuario)
    } 

    public deleteUsuario(UsuarioId: number): Observable<void> {
         return this.http.delete<void>(`${this.apiServletUrl}/usuario/delete/${UsuarioId}`)
    } 

    public getPublicContent(): Observable<any> {
        return this.http.get(API_URL + 'all', { responseType: 'text' });
      }
    
    public getUserBoard(): Observable<any> {
        return this.http.get(API_URL + 'user', { responseType: 'text' });
      }
    
    public getModeratorBoard(): Observable<any> {
        return this.http.get(API_URL + 'mod', { responseType: 'text' });
      }
    
    public getAdminBoard(): Observable<any> {
        return this.http.get(API_URL + 'admin', { responseType: 'text' });
      }
}