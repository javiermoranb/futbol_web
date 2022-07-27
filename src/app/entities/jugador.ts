export class Jugador {

    id_jugador!: number;
    nombre!: string;
    apodo!: string;
    anio!: number;
    id_equipo!: number;
    numero!: number;
    id_pie!: number;
    id_somatotipo!: number;
    estatura!: number;
    id_pais!: number;
    id_pais_nacionalidad!: number;
    id_posicion1!: number;
    id_posicion2!: number;
    perfiles!: any[];

    constructor(id_jugador: number, nombre: string, apodo: string, anio: number, id_equipo: number,
        numero: number, id_pie: number, id_somatotipo: number, estatura: number, 
        id_pais: number, id_pais_nacionalidad: number, id_posicion1: number, 
        id_posicion2: number, perfiles: any[]) { 
            this.id_jugador = id_jugador;
            this.nombre = nombre;
            this.apodo =apodo;
            this.anio = anio;
            this.id_equipo = id_equipo;
            this.numero = numero;
            this.id_pie = id_pie;
            this.id_somatotipo = id_somatotipo;
            this.estatura = estatura;
            this.id_pais = id_pais;
            this.id_pais_nacionalidad =  id_pais_nacionalidad;
            this.id_posicion1 = id_posicion1;
            this.id_posicion2 = id_posicion2;
            this.perfiles = perfiles;
        }
}
  


