import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';

import { Constants } from 'src/app/utils/constants';
import { Valoracion } from 'src/app/entities/valoracion';
import { InformeService } from 'src/app/services/informe.service';
import { TokenStorageService } from '../../authentication/_services/token-storage.service';
import { ValoracionService } from 'src/app/services/valoracion.service';

@Component({
  selector: 'valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ValoracionesComponent implements OnInit {

  isLoggedIn = false;

  valDialog!: boolean;
  valoraciones!: Valoracion[];
  selectedValoraciones!: Valoracion[];

  displayModal!: boolean;
  pdfSrc!: any;
  tempRetFileData!: any;

  loading: boolean = true;

  constructor(private informeService: InformeService,
              private valoracionService: ValoracionService,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private tokenStorage: TokenStorageService, 
              private primengConfig: PrimeNGConfig) {   }
              
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      let role = this.tokenStorage.getUser().role;
      if(role == Constants.ROLE_SCOUTER || role == Constants.ROLE_ADMIN){
        this.isLoggedIn = true;
      }
    }
    this.loadValoraciones();
    this.primengConfig.ripple = true;
  }

  async loadValoraciones(){
    (await (this.valoracionService.getValoracion())).subscribe({
      next: (response: any) => {
        this.valoraciones = response.valoraciones;
        
      },
      error: (err: any) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error cargando valoraciones', life: 3000});
        
      },
      complete: () => {
        this.loading = false;
      },
    });
  }


  deleteValoracion(valoracion: any) {
    console.log(valoracion)
    this.confirmationService.confirm({
        message: '¿Está seguro que quiere borrar la valoración?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          (await (this.valoracionService.deleteValoracion(valoracion.id_valoracion))).subscribe({
            next: (response: any) => {              
              this.valoraciones = this.valoraciones.filter(val => valoracion!=val);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Valoración borrada', life: 3000});
              
            },
            error: (err: any) => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error borrando valoración', life: 3000});
              
            }
          });
        }
    });
  }

  async exportInforme(valoracion: any){
    let tempBlob = null;

    (await (this.informeService.getInforme(valoracion.jugador.id_jugador))).subscribe({
      next: (res: any) => {  
        tempBlob = new Blob([res], { type: 'application/pdf' });
        this.pdfSrc = window.URL.createObjectURL(tempBlob)
        this.displayModal = true;
        
      },
      error: (res: any) => {
        console.log(res)
      },
    });
  }

  downloadPDF(){
    var link = document.createElement('a');
    link.href = this.pdfSrc;
    link.download = "informe-"+Date.now()+".pdf";
    link.click();
  }

}
