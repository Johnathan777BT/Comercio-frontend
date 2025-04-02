import { Injectable , signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 
   private datos =['dato1', 'dato2'];

   getDatos()
   {
      return [...this.datos];
   }

  constructor() { }

  setDato1(dato:string){
    this.datos[0]= dato;
  }

  setDato2(dato:string){
    this.datos[1]= dato;
  }


}
