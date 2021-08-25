import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { recetarioService } from 'src/app/_services/recetarios.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
@Component({
  selector: 'app-form-recetario',
  templateUrl: './form-recetario.component.html',
  styleUrls: ['./form-recetario.component.css']
})
export class FormRecetarioComponent implements OnInit {

  constructor(private modalService: NgbModal, private token: TokenStorageService, private recetarioService: recetarioService) { }
  currentUser: any;
  closeResult = '';
  form: any = {
    title: null,
    description: null
  };
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.addRecetario();
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
  private addRecetario(){
    this.recetarioService.addRecetario(this.currentUser.id, this.form).subscribe(
      Response =>{
        alert("Recetario dado de alta")
      },
      err =>{
        alert("algo a ido mal")
      }
    )


  }
}
