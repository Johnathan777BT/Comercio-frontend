import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from 'src/environments/environment';
import { Rol } from '../auth/rol';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getListRoles():Observable<any>
  {
    return this.http.get(environment.urlApi+"roles").pipe(
      catchError(this.handleError)
    )
  }


  getListUsers():Observable<any>
  {
    return this.http.get(environment.urlApi+"users").pipe(
      catchError(this.handleError)
    )
  }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.urlApi+"users/"+id).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(userRequest:User, check:number ):Observable<any>
  {
    return this.http.put(environment.urlApi+"users/ck/"+check, userRequest).pipe(
      catchError(this.handleError)
    )
  }

  

  createUser(userRequest:User):Observable<any>
  {
    return this.http.post(environment.urlApi+"users/save", userRequest).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status== 403){
      console.info('No autorizado');
      return throwError(()=> new Error('No tiene permisos para realizar la solicitud.'));      
    }
    else if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.info('Backend retornó el código de estado ', error.status, error.error);
    
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
