import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Recetario } from 'src/app/interfaces/recetario';
import { recetarioService } from 'src/app/_services/recetarios.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-form-add-to-recetario',
  templateUrl: './form-add-to-recetario.component.html',
  styleUrls: ['./form-add-to-recetario.component.css']
})
export class FormAddToRecetarioComponent implements OnInit {

  constructor(private modalService: NgbModal, private recetaioService: recetarioService, private token: TokenStorageService, private fb: FormBuilder) { }
  @Input()
  recetaId!: number ;
  closeResult = '';
  currentUser : any;
  form!: FormGroup;
  Data: Array<any> =[];
  public recetarios!: Recetario[];
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.recetaioService.getRecetariosFromUser(this.currentUser.id).subscribe(
      response =>{
        this.recetarios = response._embedded.recetarioList;
        for (var _i = 0; _i <= this.recetarios.length; _i++) {
          this.Data.push({'name' : this.recetarios[_i].title , 'value' : this.recetarios[_i].id})
        }
      }
    )
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.submitForm()
      this.addRecetaToRecetario()
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
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
  
  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  submitForm() {
    console.log(this.form.value)
  }
  addRecetaToRecetario(){
      const checkArray: FormArray = this.form.get('checkArray') as FormArray;
      checkArray.controls.forEach((item: any) => {
       this.recetaioService.addRecetaToRecetario(item.value, this.recetaId).subscribe(
          Response =>{
            alert("Receta añadida con exito")
          }
       )
      })
 
  }
}
