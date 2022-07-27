export class Valoracion {
    id_valoracion!: number;
    id_user!: number;
    descripcion_scout!: string;
    fecha!: any;
    id_visualizacion!: number;  
    descripcion_visualizacion!: string;
    id_equipo!: number;
    descripcion_equipo!: string;
    id_local!: number;
    descripcion_local!: string;
    id_visitante!: number;
    descripcion_visitante!: string;
    campeonato!: string;
    id_seguimiento!: number;
    descripcion_seguimiento!: string;
    descripcion!: string;
    id_jugador!: number;

    constructor(id_valoracion:number, id_user:number, fecha:any, id_visualizacion:number, 
        id_equipo:number, id_local:number, id_visitante:number, campeonato:string, 
        id_seguimiento:number, descripcion:string, id_jugador:number){
        
            this.id_valoracion = id_valoracion;
            this.id_user = id_user;
            this.fecha = fecha;
            this.id_visualizacion = id_visualizacion;
            this.id_equipo = id_equipo;
            this.id_local = id_local;
            this.id_visitante = id_visitante;
            this.campeonato = campeonato;
            this.id_seguimiento = id_seguimiento;
            this.descripcion = descripcion;
            this.id_jugador = id_jugador;
    }
}