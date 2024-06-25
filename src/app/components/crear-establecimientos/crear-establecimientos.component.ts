import { Component, Input, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { Comerciante } from 'src/app/services/comerciante/comerciante';
import { EstablecimientoService } from 'src/app/services/establecimiento/establecimiento.service';
import { Establecimiento } from 'src/app/services/comerciante/establecimiento';


@Component({
  selector: 'app-crear-establecimientos',
  templateUrl: './crear-establecimientos.component.html',
  styleUrls: ['./crear-establecimientos.component.css']
})
export class CrearEstablecimientosComponent implements OnInit {
[x: string]: any;

  errorMessage:String="";
  comerciante:Comerciante = new Comerciante();
  establecimiento:Establecimiento= new Establecimiento();
  json:String="";
 
  userLoginOn:boolean=false;
  lista: any=[];
  idCom:number=0;
  nombreboton:string ="Editar";
  idEst:number=0;
  check:boolean=false;
  form: FormGroup | any;
  @Output() totIngresos:EventEmitter<number> = new EventEmitter();
  @Output() totEmpleados:EventEmitter<number> = new EventEmitter();
  totIngresoscom:number=0;
  totEmpleadoscom:number=0;
  


   ngOnInit(): void {
 
  let i=0;
  this.form = this.fb.group({
    nombre: [null],
    arreglo: this.fb.array([])
  })
   console.log("idcommm_"+this.idCom);
    this.establecimientoService.getListByIdCom(this.idCom).subscribe({
      next: (userData2) => {
        this.comerciante=userData2;
        console.log("userData;"+userData2.nombre_establecimiento);      
       this.lista = userData2;
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data2 ok");
        console.log(this.lista);
        
    this.cargarDataEstablecimientos();
      }
    })

   }

   get arreglo(){
    return this.form.controls["arreglo"] as FormArray;
   }

   getSubItems(itemIndex: number) {
    return (this.form.at(itemIndex) as FormGroup).get('arreglo') as FormArray;
  }

  constructor(private fb: FormBuilder, private router:Router, private activateRoute: ActivatedRoute, private establecimientoService:EstablecimientoService,    private formBuilder:FormBuilder, private loginService:LoginService) {
   
    
    this.check= Boolean(localStorage.getItem('check'));
   
    this.idCom = activateRoute.snapshot.params['id']; 
    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })



   }


   validateFormat(event:any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
    }

   borrarGrupoE(i:number){
    const arreglo = this.form.get('arreglo') as FormArray;
    arreglo.removeAt(i);
   }


  
   delete(i: number) {
   
    const confirmar=confirm("Esta Usted seguro que desea eliminar este Establecimiento?");

    if (confirmar)
    { 
    console.log("id: "+i);
    let id_est = this.form.get('arreglo').controls[i].controls.id.value;
    this.establecimientoService.delete(id_est).subscribe({
      next:() => {
        //this.editMode=false;
       // this.comerciante=this.registerForm.value as unknown as Comerciante;
        console.log("nombre: "+this.establecimiento.nombre_establecimiento);
       
        
      },
      error:(errorData)=> {
        console.error(errorData);
        if(errorData.status!=200){ alert(''+errorData);
        }
      },
      complete: () => {
        const arreglo = this.form.get('arreglo') as FormArray;
        arreglo.removeAt(i);
        alert('Establecimiento Eliminado con Exito!');
      }

    })
    }
 }


    actualizar(i: number){
   
        if(this.form.valid)
          {         
            let ingresos = this.form.get('arreglo').controls[i].controls.ingresos.value;
            let nombre_est = this.form.get('arreglo').controls[i].controls.nombre.value;
            let nro_emp = this.form.get('arreglo').controls[i].controls.nro_empleados.value;
            let id_est = this.form.get('arreglo').controls[i].controls.id.value;
       
            this.comerciante= new Comerciante();
            this.comerciante.id_com=this.idCom;
            this.establecimiento.ingresos=ingresos;
            this.establecimiento.nombre_establecimiento=nombre_est;
            this.establecimiento.nro_empleados= nro_emp;
            this.establecimiento.comerciantes = this.comerciante;
            this.establecimiento.id_est=id_est;
             
            this.json = JSON.stringify(  this.establecimiento );

            console.log("json: "+this.json);
   
            if(this.idEst==0){

              
            this.establecimientoService.create(this.json).subscribe({
              next:() => {
               
                console.log("nombre: "+this.establecimiento.nombre_establecimiento);
                alert('Establecimiento Actualizado con Exito!');
                this.router.navigate(['inicio']);
              },
              error:(errorData)=> {
                console.error(errorData);
                alert(''+errorData);
                
              }

            })

            }
           else {

           
            this.establecimientoService.update(this.json, id_est).subscribe({
              next:() => {
                
                console.log("nombre: "+this.establecimiento.nombre_establecimiento);
                alert('Establecimiento Creado con Exito!');
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


    agregarEstablecimientos(){
      this.idEst=0;
      const arreglo = this.form.get('arreglo') as FormArray;
      let grupo = this.fb.group({
        id:[Number],
        nombre: [String, Validators.required],
        ingresos: [Number,Validators.required],
        nro_empleados: [Number,Validators.required]
      })
      for(let i=0; i< this.lista.length-1; i++)
        {
       this.borrarGrupoE(i);
        }

      this.nombreboton= "Nuevo";
     if(this.lista.length==0) {arreglo.push(grupo);}
      arreglo.reset();
    }

    cargarDataEstablecimientos() {

    const arreglo = this.form.get('arreglo') as FormArray;
    
    for(let i=0; i< this.lista.length; i++)
      {
          let grupo = this.fb.group({
          id:[Number],
          nombre: [String, Validators.required],
          ingresos: [Number,Validators.required],
          nro_empleados: [Number,Validators.required]
        })
     
      let id_Est =this.lista[i]['id_est'];
      let number= this.lista[i]['ingresos'];
      let nombre_est = this.lista[i]['nombre_establecimiento'];
      let nro_empleados = this.lista[i]['nro_empleados'];
      grupo.controls.nombre.setValue(nombre_est);
      grupo.controls.ingresos.setValue(number);
      grupo.controls.nro_empleados.setValue(nro_empleados);
      grupo.controls.id.setValue(id_Est);
      this.totIngresoscom+=number;
      this.totEmpleadoscom+=nro_empleados;
      console.log("ttoEmp: "+this.totEmpleadoscom);
      arreglo.push(grupo);
   }
  
   this.totIngresos.emit(this.totIngresoscom);
   this.totEmpleados.emit(this.totEmpleadoscom);
  }
    


}
