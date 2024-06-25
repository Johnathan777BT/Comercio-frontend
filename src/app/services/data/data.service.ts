import { Injectable , signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  datosCompartidos = signal<number>(0);
  datosCompartidos2 = signal<boolean>(false);

  constructor() { }

  

}
