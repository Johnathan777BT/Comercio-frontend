import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Establecimiento } from '../comerciante/establecimiento';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {

  constructor(private http:HttpClient) { }


  getListByIdCom(id:number):Observable<any>{
    return this.http.get(environment.urlApi+"establecimientos/listaridcom/"+id).pipe(
      catchError(this.handleError)
    )
  }

    
  update(establecimiento: Establecimiento, id:number):Observable<any>
  {
    return this.http.put(environment.urlApi+"establecimientos/act/"+id, establecimiento).pipe(
      catchError(this.handleError)
    )
  }

  create(establecimiento: Establecimiento):Observable<any>
  {
    return this.http.post(environment.urlApi+"establecimientos", establecimiento).pipe(
      catchError(this.handleError)
    )
  }

  delete(id:number):Observable<any>{
    return this.http.delete(environment.urlApi+"establecimientos/del/"+id).pipe(
      catchError(this.handleError)
  )
  }


  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.info('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

}
