import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/interfaces/post';
import { postService } from 'src/app/_services/posts.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-foro-form',
  templateUrl: './foro-form.component.html',
  styleUrls: ['./foro-form.component.css']
})
export class ForoFormComponent implements OnInit {

  constructor(private modalService: NgbModal, private postService : postService, private token: TokenStorageService) { }
  @Input()
  foroId!: number ;
  closeResult = '';
  currentUser: any;

  form: any = {
    name: null,
    body: null,
  };
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.savePost()
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  savePost(){
    this.postService.addPost(this.form, this.currentUser.id, this.foroId ).subscribe(
      Response =>{
        alert("Post dado de alta con exito")
      }
    );
  }
  
}
