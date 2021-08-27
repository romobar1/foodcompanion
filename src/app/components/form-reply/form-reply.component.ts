import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { replyService } from 'src/app/_services/reply.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-form-reply',
  templateUrl: './form-reply.component.html',
  styleUrls: ['./form-reply.component.css']
})
export class FormReplyComponent implements OnInit {

  constructor(private modalService: NgbModal, private token: TokenStorageService, private replyService: replyService) { }
  @Input()
  postId!: number ;
  closeResult = '';
  currentUser : any;
  form: any = {
    body: null,
    userName: null
  };
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.form.userName = this.currentUser.username;
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.addReply()
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
  addReply(){
    this.replyService.addReply(this.postId, this.form).subscribe(
      data =>{
        alert("Reply añadida con exito!!")
      },
      err =>{
        alert("algo a salido mal")
      }
    );
  }


}
