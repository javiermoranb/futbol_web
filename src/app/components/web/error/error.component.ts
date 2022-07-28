import { Component, OnInit } from '@angular/core';
import {Message,MessageService} from 'primeng/api';
import { TokenStorageService } from '../../authentication/_services/token-storage.service';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  providers: [MessageService]
})
export class ErrorComponent implements OnInit {

  isLoggedIn = false;
  errorNoLogged!: Message[];

  constructor(private tokenStorage: TokenStorageService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      let role = this.tokenStorage.getUser().role;
      if(role == Constants.ROLE_SCOUTER || role == Constants.ROLE_ADMIN){
        this.isLoggedIn = true;
      }else{
        this.errorNoLogged = [
          {severity:'error', summary:'Error', detail:'Permisos insuficientes, por favor contacte con el administrador de la página'}
        ];
      }
    }else {
      this.errorNoLogged = [
        {severity:'error', summary:'Error', detail:'Por favor inicie sesión'}
    ];
    }
  }

}
