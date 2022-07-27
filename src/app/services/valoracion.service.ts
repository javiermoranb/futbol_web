import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Valoracion } from '../entities/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  basePath: string = environment.serverPath + 'valoracion';

  constructor(private http: HttpClient) { }

  async getValoracion(jugadorId:number = 0) {
    let urlFilter = '?id_jugador='+jugadorId
    
    const get$ = this.http.get<any>( this.basePath + urlFilter);
    return get$
  }

  postValoracion(data: Valoracion) {
    const options = {headers: {'Content-Type': 'application/json'}};

    const post$ = this.http.post<any>(this.basePath, JSON.stringify(data), options)
    return post$
  }

  deleteValoracion(id_valoracion: number) {
    let urlFilter = '?id_valoracion='+id_valoracion
    const delete$ = this.http.delete<any>( this.basePath + urlFilter);
    return delete$
  }
}
