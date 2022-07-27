import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from "rxjs";

import { CatalogAutocomplete } from 'src/app/entities/catalog-autocomplete';
import { Constants } from 'src/app/utils/constants';
import { JugadorAutocomplete } from 'src/app/entities/jugador-autocomplete';
import { PaisAutocomplete } from 'src/app/entities/pais-autocomplete';

import { CatalogService } from 'src/app/services/catalog.service';
import { JugadorService } from 'src/app/services/jugador.service';
import { ValoracionService } from 'src/app/services/valoracion.service';
import { Jugador } from 'src/app/entities/jugador';
import { Catalog } from 'src/app/entities/catalog';
import { Pais } from 'src/app/entities/pais';
import { Valoracion } from 'src/app/entities/valoracion';
import { TokenStorageService } from '../../authentication/_services/token-storage.service';
import { AutocompleteDropdown } from 'src/app/entities/autocomplete-dropdown';
import { Validation } from 'src/app/utils/validation';

@Component({
  selector: 'tracker-form',
  templateUrl: './tracker-form.component.html',
  styleUrls: ['./tracker-form.component.css'],
  providers: [MessageService]
})
export class TrackerFormComponent implements OnInit {
  
  currentYear: number = new Date().getFullYear();

  //jugador

  jugador = new JugadorAutocomplete();
  equipo = new CatalogAutocomplete(Constants.TABLE_EQUIPO);
  pie = new CatalogAutocomplete(Constants.TABLE_PIE);
  somatotipo = new CatalogAutocomplete(Constants.TABLE_SOMATOTIPO);
  posicion1 = new CatalogAutocomplete(Constants.TABLE_POSICION);
  posicion2 = new CatalogAutocomplete(Constants.TABLE_POSICION);  
  perfil = new CatalogAutocomplete(Constants.TABLE_PERFIL);
  paisNacimiento = new PaisAutocomplete();
  paisNacionalidad = new PaisAutocomplete();
  visualizacion = new CatalogAutocomplete(Constants.TABLE_VISUALIZACION);
  seguimiento = new CatalogAutocomplete(Constants.TABLE_SEGUIMIENTO);
  local = new CatalogAutocomplete(Constants.TABLE_EQUIPO);
  visitante = new CatalogAutocomplete(Constants.TABLE_EQUIPO);
  
  jugadorApodo!: string;
  jugadorAnio!: number;
  jugadorNumero!: number;
  jugadorEstatura!: number;

  valFechaPartido: Date = new Date();
  valCampeonato!: string;
  valDescripcion!: string;

  loadFormSubject: Subject<boolean> = new Subject<boolean>();

  validarJugador: boolean = false;
  validarValoracion: boolean = false;
  
  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private catalogService: CatalogService,
    private jugadorService: JugadorService,
    private valoracionService: ValoracionService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.catalogService.getCatalog(this.perfil.table, '').then(data => this.perfil.filteredList = data);
  }

  getCatalogService(){
    return this.catalogService;
  }

  getJugadorService(){
    return this.jugadorService;
  }

  async loadJugadorInfo(){
    (await this.jugadorService.getJugadorById(this.jugador.selected.id_jugador)).subscribe({
      next: (response: any) => {
        console.log(response)
        const jugador = response.jugador;
        this.jugadorApodo = jugador.apodo;
        this.jugadorAnio = jugador.anio;
        this.equipo.selected = jugador.equipo
        this.jugadorNumero = jugador.numero;
        this.pie.selected = jugador.pie;
        this.somatotipo.selected = jugador.somatotipo;
        this.jugadorEstatura = jugador.estatura;
        this.paisNacimiento.selected = jugador.pais;
        this.paisNacionalidad.selected = jugador.nacionalidad;
        this.posicion1.selected = jugador.posicion1;
        this.posicion2.selected = jugador.posicion2;
        this.perfil.selected = jugador.perfiles;
        
      },
      error: (err: any) => {
        console.log(err);
        this.messageService.add({severity:"error", summary:'Error', detail:'Error cargando el jugador'});
      },
      complete: () => {
        this.loadValoracionTable();
      },
    });
  }

  validateJugador(){
    this.validarJugador = true;
    let required = [this.jugador, this.jugadorApodo, this.jugadorAnio, this.equipo, 
      this.jugadorNumero, this.pie, this.somatotipo, this.jugadorEstatura,
      this.paisNacimiento, this.paisNacionalidad, this.posicion1, this.posicion2]


    return Validation.validateRequired(required);
  }

  validateValoracion(){
    this.validarValoracion = true;
    let required = [this.seguimiento, this.visualizacion, this.valFechaPartido,
      this.valCampeonato, this.local, this.visitante, this.valDescripcion]

    return Validation.validateRequired(required);
  }

  instanceJugador(idJugador:number){
    let perfiles: number[] = [];

    this.perfil.selected?.forEach((element:any) => {
      perfiles.push(element.id_perfil);
    });

    console.log(this.equipo)

    return new Jugador(idJugador, this.isJugador()?this.jugador.selected.nombre:this.jugador.selected, this.jugadorApodo, this.jugadorAnio, this.equipo.selected?.id_equipo, this.jugadorNumero,
      this.pie.selected?.id_pie, this.somatotipo.selected?.id_somatotipo, this.jugadorEstatura, this.paisNacimiento.selected?.id_pais, 
      this.paisNacionalidad.selected?.id_pais, this.posicion1.selected?.id_posicion, this.posicion2.selected?.id_posicion, perfiles);
  }

  async saveJugador() {
    if(this.validateJugador()){
      (await (this.jugadorService.postJugador(this.instanceJugador(0)))).subscribe({
        next: (response: any) => {
          console.log(response)
          this.jugador.selected = {'id_jugador': response.jugador.id_jugador, 'nombre': response.jugador.nombre}
          this.messageService.add({severity:"success", summary:'Success', detail:'Nuevo jugador guardado'});
          
        },
        error: (err: any) => {
          console.log(err);
          this.messageService.add({severity:"error", summary:'Error', detail:'Error al guardar el jugador'});
          
        },
        complete: () => {
          this.loadValoracionTable();
          console.log('complete saveJugador');
        },
      });
    }
  }

  async updateJugador(){
    (await (this.jugadorService.putJugador(this.instanceJugador(this.jugador.selected.id_jugador)))).subscribe({
      next: (response: any) => {
        this.messageService.add({severity:"success", summary:'Success', detail:'El jugador ha sido editado.'});
        
      },
      error: (err: any) => {
        console.log(err);
        this.messageService.add({severity:"error", summary:'Error', detail:'Error al editar el jugador'});
        
      },
      complete: () => {
        console.log('complete updateJugador');
      },
    });
  }

  async saveValoracion() {
    
    if(this.validateValoracion()){
      let valoracion = new Valoracion(0,
        this.tokenStorage.getUser().id_user, this.valFechaPartido, this.visualizacion.selected?.id_visualizacion,
        this.equipo.selected?.id_equipo, this.local.selected?.id_equipo, this.visitante.selected?.id_equipo, this.valCampeonato,
        this.seguimiento.selected?.id_seguimiento, this.valDescripcion, this.jugador.selected?.id_jugador);
        console.log(valoracion);
        console.log(this.equipo);
        (await (this.valoracionService.postValoracion(valoracion))).subscribe({
          next: (response: any) => {
            this.cleanValoracion()
            this.messageService.add({severity:"success", summary:'Valoración guardada', detail:'Nueva valoración guardada'});
            this.loadValoracionTable();
          },
          error: (err: any) => {
            console.log(err);
            this.messageService.add({severity:"error", summary:'Error', detail:'Error al guardar la valoración'});
            
          },
          complete: () => {
            console.log('complete saveValoracion');
          },
        });
      }
  }

  loadValoracionTable(){
    this.loadFormSubject.next(true);
  }

  cleanValoracion(){
    this.visualizacion.selected = null;
    this.local.selected = null;
    this.visitante.selected = null;
    this.valCampeonato = '';
    this.seguimiento.selected = null;
    this.valDescripcion = '';
    this.validarValoracion = false;
  }

  isJugador(){
    return this.jugador.selected instanceof Object
  }
}
