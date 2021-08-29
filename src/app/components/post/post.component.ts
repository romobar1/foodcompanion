import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { postService } from 'src/app/_services/posts.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserControlService } from 'src/app/_services/user-control.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  currentUser: any;
  post! : Post;
  constructor(private route : ActivatedRoute, private postService: postService, private sendTo: Router, private userControl: UserControlService, private token: TokenStorageService) { }
  postId :number = 0;
  isUserLogged!: boolean;
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    
    this.route.queryParams.subscribe( params =>{
      this.postId = params['post'];

  });
  this.postService.getPost(this.postId).subscribe(
    data =>{
      this.post = data
    },
    err =>{
          if(err.status==500){
              this.sendTo.navigate(['error'])
          }else if(err.status==404){
            this.sendTo.navigate(['error'])
          }
      }
  );
  
  this.isUserLogged = this.userControl.isLogged();
 
  }
  
  closeTema(){
    if (confirm('¿Estas seguro de querer cerrar este tema?')) {
      this.postService.closePost(this.postId).subscribe(
        Response=>{
          alert("Tema dado de baja con éxito!!!")
        },
        err=>{
          alert("Algo ha salido mal...")
        }
      )
    } else {
      //Close alert
    }
  }


}
