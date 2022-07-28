import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../authentication/_services/token-storage.service';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService) { }


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      let role = this.tokenStorage.getUser().role;
      if(role == Constants.ROLE_SCOUTER || role == Constants.ROLE_ADMIN){
        this.isLoggedIn = true;
      }
    }
  }



}
