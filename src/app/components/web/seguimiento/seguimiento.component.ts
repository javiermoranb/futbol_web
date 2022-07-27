import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../authentication/_services/token-storage.service';

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
      this.isLoggedIn = true;
    }
  }



}
