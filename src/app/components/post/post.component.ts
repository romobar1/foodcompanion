import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { postService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post! : Post;
  constructor(private route : ActivatedRoute, private postService: postService) { }
  postId :number = 0;
  ngOnInit(): void {
    this.route.queryParams.subscribe( params =>{
      this.postId = params['post'];
  });
  this.postService.getPost(this.postId).subscribe(
    data =>{
      this.post = data
    }
  );
  }

}
