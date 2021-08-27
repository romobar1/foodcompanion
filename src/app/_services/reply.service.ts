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
export class replyService{
    private apiServletUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){}

    public addReply(postId: number, form :any): Observable<any> {
        return this.http.post<any>(`${this.apiServletUrl}/replies/add/${postId}`,form , httpOptions )
    }


}
