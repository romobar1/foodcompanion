import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { recetaService } from 'src/app/_services/receta.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import {FileUploadService} from '../../_services/file-upload.service'
import { Receta } from 'src/app/interfaces/receta';
import { HttpEventType, HttpResponse } from '@angular/common/http';
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result: any) => {
      this.upload()
    });
  }

  
  upload() {
    let filename = this.receta.imageURl;
    if( this.currentFile === undefined || this.currentFileName === filename){
      this.recetaService.updateReceta(this.receta).subscribe(
        Response =>{
          alert("receta editada con éxito sin subir foto")
        },
        err=>{
          alert("Algo a salido mal")
        }
      )
    }else{
      this.fileUploadService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
              this.save()
          }
        },
        (err: any) => {
          const msg = 'Could not upload the file: ' + this.currentFile.name;
          alert(msg);
        }
      )
    }
  }

  save() {
    this.recetaService.updateReceta(this.receta).subscribe(
      Response=>{
        alert("Receta dada de alta con éxito")
      },
      err=>{
        alert("Algo a salido mal")
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