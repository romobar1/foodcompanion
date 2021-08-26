import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { recetaService } from 'src/app/_services/receta.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import {FileUploadService} from '../../_services/file-upload.service'
@Component({
  selector: 'app-from-receta',
  templateUrl: './form-receta.component.html',
  styleUrls: ['./form-receta.component.css']
})
export class FormRecetaComponent implements OnInit {
  currentUser: any;
  tagsString: any;
  form: any = {
    title: null,
    description: null,
    numComensales: null,
    dificultad : null,
    tags: null,
    ingredientes: null,
    body: null,
    rate: null,
    tiempo: null,
    type: null,
    imageURl: null
  };
  empList: Array<String> = [];
  closeResult = '';
  currentFile!: File;
  constructor(private modalService: NgbModal, private recetaService: recetaService, private token: TokenStorageService, private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
  onFileSelected(event: any) : void {
    if(event.target.files.length > 0) 
     {
      this.form.imageURl = event.target.files[0].name;
      this.currentFile = event.target.files[0];
     }
   }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' ,size: 'xl'}).result.then((result: any) => {
      this.upload()
      this.save()
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
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
  
  save() {
      this.recetaService.addReceta(this.form, this.currentUser.username).subscribe(
        this.upload
      )
  }

  upload() {
    this.fileUploadService.upload(this.currentFile).subscribe(
      (err: any) =>{
        alert("Receta dada de alta con exito!")
      }
    )
}

parseConditions() {
  let stringIn = this.tagsString;
  stringIn = stringIn.split(',');
  for (let i =0; i < stringIn.length; i++){
    this.empList.push(stringIn[i]);
  }
  this.form.tags = this.empList;
}
}
