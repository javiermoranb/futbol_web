import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  basePath: string = environment.serverPath + 'informe';

  constructor(private http: HttpClient) { }

  async getInforme(jugadorId: number) {
    let urlFilter = '?id_jugador='+jugadorId

    const get$ = this.http.get( this.basePath + urlFilter, {responseType: 'blob'});
    return get$;

    /*return this.http.get<any>( this.basePath + urlFilter)
    .pipe<any>(map((response: Response) => response.arrayBuffer()))
    .pipe(map((arrayBuffer: ArrayBuffer) => new Uint8Array(arrayBuffer)))
    .pipe(first());*/
  }
}
