import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { recetaService } from 'src/app/_services/receta.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import {FileUploadService} from '../../_services/file-upload.service'
import { Receta } from 'src/app/interfaces/receta';
@Component({
  selector: 'app-form-edit-receta',
  templateUrl: './form-edit-receta.component.html',
  styleUrls: ['./form-edit-receta.component.css']
})
export class FormEditRecetaComponent implements OnInit {
  @Input()
  recetaId!: number ;
  currentUser: any;
  tagsString: any;
  public receta!: Receta;
  empList: Array<String> = [];
  closeResult = '';
  currentFile: any;
  currentFileName = "";
  constructor(private modalService: NgbModal, private recetaService: recetaService, private token: TokenStorageService, private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.recetaService.getReceta(this.recetaId).subscribe(
      data =>{
        this.receta = data;
      }
  )
  }
  onFileSelected(event: any) : void {
    if(event.target.files.length > 0) 
     {
      this.currentFile = event.target.files[0];
      this.currentFileName = event.target.files[0].name;
     }
   }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
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
    let filename = this.receta.imageURl;
    if( this.currentFile === null || this.currentFileName === filename){
      this.recetaService.updateReceta(this.receta).subscribe(
        Response =>{
          alert("receta editada con exito sin subir foto")
        }
      )
    }else{
      this.recetaService.updateReceta(this.receta).subscribe(
        this.upload
      )
    }
  }

  upload() {
    this.fileUploadService.upload(this.currentFile).subscribe(
      (err: any) =>{
        alert("Receta editada con exito subiendo image")
      }
    )
}

parseConditions() {
  let stringIn = this.tagsString;
  stringIn = stringIn.split(',');
  for (let i =0; i < stringIn.length; i++){
    this.empList.push(stringIn[i]);
  }
  this.receta.tags = this.empList;
}



}