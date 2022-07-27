import { Component, Input, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { InformeService } from 'src/app/services/informe.service';
import { Valoracion } from 'src/app/entities/valoracion';
import { ValoracionService } from 'src/app/services/valoracion.service';
import { Jugador } from 'src/app/entities/jugador';

@Component({
  selector: 'valoracion-table',
  templateUrl: './valoracion-table.component.html',
  styleUrls: ['./valoracion-table.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ValoracionTableComponent implements OnInit {

  @Input('jugador')
  jugador!: Jugador;
  @Input('loadFormSubject') 
  loadFormSubject: any;

  valDialog!: boolean;
  valoraciones!: Valoracion[];
  selectedValoraciones!: Valoracion[];

  displayModal!: boolean;
  pdfSrc!: any;
  tempRetFileData!: any;



  constructor(private informeService: InformeService,
              private valoracionService: ValoracionService,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService) { 
                
    this.loadFormSubject = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.loadFormSubject.subscribe((response: any) => {
    if(response){
        console.log('loadValoraciones')
        this.loadValoraciones();
      }
    })
  }

  async loadValoraciones(){
    (await (this.valoracionService.getValoracion(this.jugador.id_jugador))).subscribe({
      next: (response: any) => {
        this.valoraciones = response.valoraciones;
        
      },
      error: (err: any) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error cargando valoraciones', life: 3000});
        
      },
      complete: () => {
        console.log('completed getValoracion');
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

  async exportInforme(){
    let tempBlob = null;
    console.log('exportInforme ');

    (await (this.informeService.getInforme(this.jugador.id_jugador))).subscribe({
      next: (res: any) => {  
        console.log('Ok exportInformae')
        console.log(res)

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
    link.download = this.jugador.nombre+Date.now()+".pdf";
    link.click();
  }

}
