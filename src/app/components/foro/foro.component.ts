import { Component, OnInit } from '@angular/core';
import { Foro } from 'src/app/interfaces/foro';
import { Post } from 'src/app/interfaces/post';
import { foroService } from 'src/app/_services/foro.service';
import { postService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  foro!: Foro;
  posts!: Post[];
  isPostsEmpty = true;
  constructor(private foroService: foroService, private postService: postService) { }

  ngOnInit(): void {
    this.foroService.getForo().subscribe(
      data =>{
        //Foro cargado con exito
        this.foro = data;
      }
    );
    this.postService.getAllPosts().subscribe(
      data=>{
        if(Object.keys(data).length  ===  1 ){
          this.isPostsEmpty = true;
          }else{
            this.isPostsEmpty = false;
          }
        this.posts = data._embedded.postList;
      }
    );
  }
}
