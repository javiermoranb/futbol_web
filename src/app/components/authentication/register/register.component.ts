import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Validation } from 'src/app/utils/validation';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  validarRegister = false;
  errorMessage = '';

  constructor(private authService: AuthService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
  }

  validateRegister(username: any, email: any, password: any){
    this.validarRegister = true;
    let required = [username, email, password]


    return Validation.validateRequired(required);
  }

  register(): void {
    const { username, email, password } = this.form;
    if(this.validateRegister(username, email, password)){
      this.authService.register(username, email, password).subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.messageService.add({severity:"success", summary:'Registro Ok', detail:'Su usuario ha sido registrado'});
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          console.log(err)
          if(err.status == 201){
            this.messageService.add({severity:"success", summary:'Registro Ok', detail:'Su usuario ha sido registrado'});
          }else{
            this.messageService.add({severity:"error", summary:'Error', detail:err.error.text});
          }
        }
      });
    }
  }
}
