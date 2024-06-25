import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comerciante } from './comerciante';


@Injectable({
  providedIn: 'root'
})
export class ComercianteService {

  constructor(private http:HttpClient) { }

   
  update(comerciante: String, id:number):Observable<any>
  {
    return this.http.put(environment.urlApi+"comerciantes/act/"+id, comerciante).pipe(
      catchError(this.handleError)
    )
  }

   
  update_estado(comerciante: String, id:number):Observable<any>
  {
    return this.http.patch(environment.urlApi+"comerciantes/actestado/"+id, comerciante).pipe(
      catchError(this.handleError)
    )
  }

  
  delete(id:number):Observable<any>{
    return this.http.delete(environment.urlApi+"comerciantes/del/"+id).pipe(
      catchError(this.handleError)
  )
  }

  create(comerciante: String):Observable<any>
  {
    return this.http.post(environment.urlApi+"comerciantes", comerciante).pipe(
      catchError(this.handleError)
    )
  }

  getList(page:number):Observable<any>
  {
    return this.http.get(environment.urlApi+"comerciantes/listardto/?page="+page).pipe(
      catchError(this.handleError)
    )
  }

  getListTotal():Observable<any>
  {
    return this.http.get(environment.urlApi+"comerciantes/listar").pipe(
      catchError(this.handleError)
    )
  }

   getDepartamentos():Observable<any>
   {
    return this.http.get(environment.urlApi+"departamentos/listar").pipe(
      catchError(this.handleError)
    )
   }

   getMunicipios():Observable<any>
   {
    return this.http.get(environment.urlApi+"municipios/listar").pipe(
      catchError(this.handleError)
    )
   }

   getMunicipiosByIdDep(id:number):Observable<any>
   {
    return this.http.get(environment.urlApi+"municipios/listar/"+id).pipe(
      catchError(this.handleError)
    )
   }

  getListById(id:number):Observable<any>{
    return this.http.get(environment.urlApi+"comerciantes/listar/"+id).pipe(
      catchError(this.handleError)
    )
  }


  getPdf(id:number):Observable<any>{
    return this.http.get(environment.urlApi+"comerciantes/listar/pdf/"+id,
      { responseType: 'blob' as 'json', observe: 'response' }
    );
  }

  getCSV():Observable<any>{
    return this.http.get(environment.urlApi+"comerciantes/listar/csv",
      { responseType: 'blob' as 'json', observe: 'response' }
    );
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


