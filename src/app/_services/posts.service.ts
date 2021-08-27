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
export class postService{
    private apiServletUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){}

    public addPost(form: any, userid: number, forumid: number): Observable<any> {
        return this.http.post<any>(`${this.apiServletUrl}/post/add/user/${userid}/forum/${forumid}`, form, httpOptions )
    }

    public getAllPosts(): Observable<any> {
        return this.http.get<any>(`${this.apiServletUrl}/post/all`)
    }
    public getPost(postId : number): Observable<any> {
        return this.http.get<any>(`${this.apiServletUrl}/post/find/${postId}`)
    }
    
}