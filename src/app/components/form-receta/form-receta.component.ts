import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { recetaService } from 'src/app/_services/receta.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import {FileUploadService} from '../../_services/file-upload.service'
import { ProfileComponent } from '../profile/profile.component';
import { HttpEventType, HttpResponse } from '@angular/common/http';
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
  constructor(private modalService: NgbModal
            , private recetaService: recetaService
            , private token: TokenStorageService
            , private fileUploadService: FileUploadService
            , private profileComponen: ProfileComponent ) {}

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
      this.closeResult = `Closed with: ${result}`;
    });
  }

  
  save() {
      this.recetaService.addReceta(this.form, this.currentUser.username).subscribe(
        Response =>{
          alert("Receta dada de alta con exito ")
        },err=>{
          alert("Algo a salido mal")
        }
      )
  }

  upload() {
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

parseConditions() {
  let stringIn = this.tagsString;
  stringIn = stringIn.split(',');
  for (let i =0; i < stringIn.length; i++){
    this.empList.push(stringIn[i]);
  }
  this.form.tags = this.empList;
}
}
