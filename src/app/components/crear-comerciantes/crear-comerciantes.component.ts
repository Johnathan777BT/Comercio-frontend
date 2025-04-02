import { AfterViewChecked, Component, ViewChild, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { ComercianteService } from 'src/app/services/comerciante/comerciante.service';
import { Comerciante } from 'src/app/services/comerciante/comerciante';
import { Departamento } from 'src/app/services/comerciante/departamento';
import { Municipio } from 'src/app/services/comerciante/municipio';
import { CrearEstablecimientosComponent } from '../crear-establecimientos/crear-establecimientos.component';
import { DataService } from 'src/app/services/data/data.service';
import * as _moment from 'moment';
import { registerLocaleData } from '@angular/common'; 
import localeDe from '@angular/common/locales/de'; registerLocaleData(localeDe);
import {ChangeDetectionStrategy} from '@angular/core';

import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-crear-comerciantes',
  templateUrl: './crear-comerciantes.component.html',
  styleUrls: ['./crear-comerciantes.component.css'],
 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrearComerciantesComponent implements OnInit {

  moment = _moment;
  errorMessage:String="";
  comerciante:Comerciante = new Comerciante();
  departamento: Departamento= new Departamento();
  municipio:Municipio = new Municipio();
  userLoginOn:boolean=false;
  editMode:boolean=true;
  listaDep: any[] = [];
  listaMun: any[] = [];
  lista: any=[];
  json:String="";
  idCom:number=0;
  nro_est:number = 0;
  private dataService = inject(DataService);
  check:boolean=false;
  idmun:number=0;
  seleccionado:number=0;
  totIngresos:number =0;
  totEmpleados:number =0;
  nombre_dep:string="";

  registerForm=this.formBuilder.group({
    id:[''],
    fecha_registro:['',Validators.required],
    nombre:['', Validators.required],
    estado:[''],
    departamentos:[''],
    municipios:[''],
    telefono:[''],
    correo_electronico:[''],
    check:[''],
  })

  
  getIngresos(num: number):void{
       this.totIngresos=num;
  }

  getEmpleados(num2: number):void{
    this.totEmpleados=num2;
 }
  

 validateFormat(event:any) {
  let key;
  if (event.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  } else {
    key = event.keyCode;
    key = String.fromCharCode(key);
  }
  const regex = /[0-9]/;
   if (!regex.test(key)) {
    event.returnValue = false;
     if (event.preventDefault) {
      event.preventDefault();
     }
   }
  }


  getDatos(){
    return this.dataService.getDatos();
  }
  

  constructor(private datePipe: DatePipe, private router:Router, private activateRoute: ActivatedRoute, private comercianteService:ComercianteService, private formBuilder:FormBuilder, private loginService:LoginService ){
   //cambiar este id //environment.userId
   this.idCom = activateRoute.snapshot.params['id'];  
   this.nro_est = activateRoute.snapshot.params['tot'];
   localStorage.setItem('est', String(this.nro_est));
   
   //this.dateAdapter.setLocale('en-GB');


    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })
    
  }

  
  ngOnInit(): void {

this.dataService.setDato1("0");
this.dataService.setDato2("0");

   console.log("datos desde service: "+this.getDatos());

    this.comercianteService.getDepartamentos().subscribe(
		  (data) => {
			//if ((!data && !data.result) || (data && data.result && data.result.length ==0)) {
			console.log(data);
      if(data.length==0 || !data){
        this.listaDep = [];			  
			}
			else {        
			  this.listaDep = data;     			  
        console.log("aqui hay data de dep");	
        
        for(let item of this.listaDep)
          {
            if(item.listCom.length>0){
              this.seleccionado=item.id_departamento;
                console.log(item.listCom.length+"--")
            }           
                 
          }        

          console.log("nombre_dep: "+ this.nombre_dep);
          if(this.listaDep.length >0){
            console.log("llena la lista de dep");

            this.comercianteService.getDepartamentoByName(this.nombre_dep).subscribe(
              (data1)=> {
                if(data1.length==0 || !data1){
              }else{
                console.log(data1);
                   let id = data1['id_departamento'];
                   console.log("id-"+id);
                   let item2 = { id_departamento: id, nombreDepartamento:  this.nombre_dep }
                   this.registerForm.controls.departamentos.setValue(item2.id_departamento);

                   this.changeClassesLevel(id);
              }
            }
             );

          }

			}

		  },
		  error => {
        console.log("error listando dep");
			// Aquí se debería tratar el error, bien mostrando un mensaje al usuario o de la forma que se desee.
		  }
		);

    



    this.comercianteService.getMunicipios().subscribe(
		  (data) => {
			//if ((!data && !data.result) || (data && data.result && data.result.length ==0)) {
			console.log(data);
      if(data.length==0 || !data){
        this.listaMun = [];			  
			}
			else {        
			  this.listaMun = data;     			  
        console.log("aqui hay data de mun");			 
			}

		  },
		  error => {
        console.log("error listando dep");
			// Aquí se debería tratar el error, bien mostrando un mensaje al usuario o de la forma que se desee.
		  }
		);


    

   if(this.idCom==0){

   }else{

   this.comercianteService.getListById(this.idCom).subscribe({
      next: (userData) => {
        this.comerciante=userData;
       console.log( "traer fecha:"+userData.fecha_registro);
       let fec = String(userData.fecha_registro);
       console.log("fec_dia "+fec.substring(8,fec.length));
       console.log("fec_mes "+fec.substring(5,7));
       console.log("fec_año "+fec.substring(0, 4));
       let dia = Number(fec.substring(8,fec.length))+1;
       let newF =   fec.substring(0,4)  +"-"+fec.substring(5,7)+"-"+ dia;
       console.log("newF:"+ newF );
       let dia1 =  new Date(newF);
        dia1 = new Date( dia1.setDate(dia1.getDate() +1));
        console.log("dia "+dia1);
        
        var date = this.datePipe.transform((newF), 'yyyy-MM-dd'); 
        
        console.log(this.comerciante);
        this.nombre_dep = userData.nombre_departamento;
        this.registerForm.controls.id.setValue(userData.id_com.toString());
        this.registerForm.controls.nombre.setValue( userData.nombre);
        this.registerForm.controls.fecha_registro.setValue(date);
        this.registerForm.controls.estado.setValue( userData.estado);
        this.registerForm.controls.correo_electronico.setValue(userData.correo_electronico);
        this.registerForm.controls.telefono.setValue(userData.telefono);
     
        console.log("date:"+date + "dep: "+ this.nombre_dep) ;

       this.lista = userData;
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data ok");
       // console.log("userData;"+this.lista.departamentos);      
        console.log(this.lista);
      }
    })
  }

  

  }

  get nombre()
  {
    return this.registerForm.controls.nombre;
  }

  get fechaRegistro()
  {
    return this.registerForm.controls.fecha_registro;
  }

  get estado()
  {
    return this.registerForm.controls.estado;
  }

  get departamentos(){
    return this.registerForm.controls.departamentos;
  }

  get municipios(){
    return this.registerForm.controls.municipios;
  }

   get telefono(){
    return this.registerForm.controls.telefono;
   }

   get correo_electronico(){

        return this.registerForm.controls.correo_electronico;
   }

  saveData()
  {
    console.log("entro: valid form");

    if (this.registerForm.valid)
    {

        let fecha_formateada = this.registerForm.controls.fecha_registro.value!;
        let fecha_nueva = fecha_formateada.toString();


       let v= this.datePipe.transform(fecha_nueva,"dd-MM-yyyy"); //esto funka

        this.municipio.id_municipio = Number(this.registerForm.controls.municipios.value)!;
        this.departamento.id_departamento = Number(this.registerForm.controls.departamentos.value)!;
        this.comerciante.departamentos= this.departamento;
        this.comerciante.municipios= this.municipio;
        this.comerciante.telefono= this.registerForm.controls.telefono.value!;
        this.comerciante.nombre= this.registerForm.controls.nombre.value!;
        this.comerciante.fecha_registro=v!;
        this.comerciante.correo_electronico= this.registerForm.controls.correo_electronico.value!;
       
        console.log("fecha_enviadaaaa_ "+this.comerciante.fecha_registro);
       
      this.json = JSON.stringify(  this.comerciante );

      console.log("json: "+this.json);
   
    
      const id_= Number(this.registerForm.controls.id.value);
      

      console.log("id_com  "+ this.idCom); 
      if(this.idCom!=0){

      this.comercianteService.updatecom(this.comerciante, id_).subscribe({
        next:() => {
          this.editMode=false;
       
          alert('Comerciante Actualizado con Exito!');
           this.router.navigate(['inicio']);
        },
        error:(errorData)=> {
          console.error(errorData);
          if(errorData.status!=200){
            alert(''+errorData);
          }
          
        }
      })

   
    }else{

      this.comercianteService.createcom(this.comerciante).subscribe({
        next:() => {
          this.editMode=false;
       
          console.log("nombre: "+this.comerciante.nombre);

      alert('Comerciante Insertado con Exito!');
      this.router.navigate(['inicio']);
        },
        error:(errorData)=> {
          console.error(errorData);
          alert(''+errorData);
        }
      })

    }
    }

    
  }

  changeClassesLevel(id: string ) {
   
    console.log("Hit");
    console.log(id);
    const id_ = Number(id);
    this.comercianteService.getMunicipiosByIdDep(id_).subscribe(
		  (data) => {
		
			console.log(data);
      if(data.length==0 || !data){
        this.listaMun = [];			  
			}
			else {        
			  this.listaMun = data; 
       
       		 
			}

		  },
		  error => {
        console.log("error listando comerciantes");
			// Aquí se debería tratar el error, bien mostrando un mensaje al usuario o de la forma que se desee.
		  }, () => {

        if (this.listaMun.length > 0) {
          const et = this.listaMun[0]; // Obtener el primer elemento
          console.log(et.id_municipio + "--");
          this.idmun = et.id_municipio; // Asignar el id_municipio
        }
        
        console.log("id mun:  "+this.idmun);
        
        this.registerForm.controls.municipios.setValue(this.idmun.toString());	
      }
     
		);
    

  }



  getId(e:any, id:string)
{

 
   localStorage.setItem('check', 'false');

  if(e.target.checked)
    {
        console.log(id + 'cheched');
        this.check=true;
        this.nro_est = Number(localStorage.getItem("est"));
        console.log("nro estable:"+this.nro_est);
       
    }
    else{
      this.nro_est=0;
      this.check=false;
        console.log(id + 'Uncheched');
      
    }

    
}

}
