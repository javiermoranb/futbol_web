import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  

  async getCatalog(table: string, filter: string) {
    let urlFilter = ''
    if (filter){
      urlFilter = '?desc='+filter
    }
    const basePath: string = environment.serverPath + 'catalog/';
    const get$ = this.http.get( basePath + table + urlFilter);
    const res = await lastValueFrom(get$)
    return res;
  }

  async getCatalogById(table: string, id: number) {
    const basePath: string = environment.serverPath + 'catalog/';
    const get$ = this.http.get( basePath + table + '?id='+id);
    const res = await lastValueFrom(get$)
    return res;
  }

  async getPaises(filter: string) {
    let urlFilter = ''
    if (filter){
      urlFilter = '?nombre='+filter
    }
    const basePath: string = environment.serverPath + 'catalog/pais';
    const get$ = this.http.get( basePath + urlFilter);
    const res = await lastValueFrom(get$)
    return res;
  }

  async getPaisesById(id: number) {
    const basePath: string = environment.serverPath + 'catalog/pais';
    const get$ = this.http.get( basePath + '?id='+id);
    const res = await lastValueFrom(get$)
    return res;
  }
}
