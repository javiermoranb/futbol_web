export class Catalog {
    id!: number;
    descripcion!: string;

    constructor(id: number, descripcion: string){
        this.id = id;
        this.descripcion = descripcion;
    }
}