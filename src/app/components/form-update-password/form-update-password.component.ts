import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-form-update-password',
  templateUrl: './form-update-password.component.html',
  styleUrls: ['./form-update-password.component.css']
})
export class FormUpdatePasswordComponent implements OnInit {
  closeResult = '';
  errorPasword = false;
  constructor(private modalService: NgbModal, private auth: AuthService, private token: TokenStorageService) { }
  form: any = {
  };
  ngOnInit(): void {
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.changePass();
      this.closeResult = `Closed with: ${result}`;
    });
  }
  public changePass(){
    this.form.username = this.token.getUser().username;
    this.auth.updatePassword(this.token.getUser().username, this.form.password, this.form.newPassword).subscribe(
      Response=>{
        alert("Contraseña cambiada con exito!!!")
      },err=>{
        this.errorPasword = true;
      }
    )
  }
}
