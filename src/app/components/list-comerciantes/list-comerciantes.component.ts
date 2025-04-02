import { Component,  OnInit } from '@angular/core';
import { Comerciante } from '../../services/comerciante/comerciante';
import { ComercianteService } from 'src/app/services/comerciante/comerciante.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-comerciantes',
  templateUrl: './list-comerciantes.component.html',
  styleUrls: ['./list-comerciantes.component.css']
})
export class ListComerciantesComponent implements OnInit  {

  errorMessage:String="";
  lista: any[] = [];
  listaT: Observable<Comerciante> | undefined;
  maxSize:number=0; 
  userLoginOn:boolean=false;
  totalItems: number=0;
  page: number=0;
  previousPage: number=0;
  showPagination: boolean=false;
  json:String="";
  estado:boolean=false;
  comerciante:Comerciante=new Comerciante();
  nombre_campo:string=" ";

  formulario = this.formBuilder.group({

    nombre: ['', Validators.required],

  });


  

  constructor(private formBuilder: FormBuilder, private router:Router, private comercianteService:ComercianteService, private loginService:LoginService){
    this.totalItems=0;
    
    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })

   
  }

    
  enviar(com:any):void{
  
  
    console.log("entrooooooo");
    this.router.navigate(['container-establecimiento/'+com.id_com]);

  }


  delete(com: any) {
   

    const confirmar=confirm("Esta Usted seguro que desea eliminar este Comerciante?");

    if (confirmar)
    { 
        console.log("id: "+com.id_com);

     
      this.comercianteService.deletecom(com.id_com).subscribe({
      next:() => {
        console.log("dfgdf");
       alert('Comerciante Eliminado con Exito!');
       //this.getList(this.page);
       this.getListbyName(this.page, '');
       this.router.navigate(['inicio']);
       
      },
      error:(errorData)=> {
        console.error(errorData);
        if(errorData.status!=200){ alert(''+errorData);
        }
      },
      complete: () => {
      
      }

    })
  }
  
 }

  download(com:any):void{

    const fileName ='reporte_'+Math.random()+'.pdf';
    this.comercianteService.getPdf(com.id_com).subscribe( (res:any)=>
      {
        
        let filename = res.headers
        ?.get('content-disposition')
        ?.split(';')[1]
        .split('=')[1];
      let blob: Blob = res.body as Blob;
      var a = document.createElement('a');
      a.setAttribute('download', fileName);
     
      a.href = window.URL.createObjectURL(blob);
      a.click();
      }, err => {
        if(err.status==403){
          alert('No tiene permisos para realizar la solicitud');
        }
        
        // Aquí se emitirá el alerta con el mensaje que `throwError` devuelva.
      }
    )


  }


  actualizarestado(com:any):void {

     
        if(com.estado==true){
               this.estado =false;
        }else{
           this.estado=true;
        }
        
        this.comerciante.estado=this.estado;

        let jsonest='{ "estado":'+this.estado+' }'; 

        this.json = JSON.stringify( jsonest);

        console.log(jsonest + "; id_com:"+ com.id_com);

        this.comercianteService.update_estado(jsonest, com.id_com).subscribe({
          next:() => {
         
            alert('estado Actualizado con Exito!');
             //this.getList(this.page-1);
             this.getListbyName(this.page-1,this.nombre_campo);
          },
          error:(errorData)=> {
            console.error(errorData);
            alert(''+errorData);
          }
        })

  }
      
    
  getListbyName(page : number, nombre:string): void{
    
    if(this.nombre_campo==" "){
      this.comercianteService.getListTotal().subscribe(
        (data) => {
          if(data.length==0 || !data){
  
          }else{
            this.maxSize = data['totalElements']+1;
            console.log("totElem"+this.maxSize);
          }
        }
      )
    }

    this.comercianteService.getList(page, nombre!).subscribe(
      (data) => {
      //if ((!data && !data.result) || (data && data.result && data.result.length ==0)) {
      console.log(data);
      if(data.length==0 || !data){
        this.lista = [];
        this.showPagination = false;
      }
      else {
        
        this.lista = data;      
        this.totalItems = data.length;
        console.log("aqui hay data"+this.totalItems);
       // this.maxSize= this.totalItems+1;
        this.showPagination = true;
      }

      },
      error => {
        console.log("error listando comerciantes");
      // Aquí se debería tratar el error, bien mostrando un mensaje al usuario o de la forma que se desee.
      }
    );

  }


  enviarFormulario(): void {

    if (this.formulario.valid) {
  
     this.nombre_campo  = this.formulario.controls.nombre.value!;
  
       console.log("nombre:"+this.nombre_campo);
      
       this.getListbyName(this.page-1, this.nombre_campo);

    } else {
  
      // Manejar caso de formulario inválido
  
    }
  
  }

  ngOnInit(): void {
    
    this.page =0;
	  this.previousPage =1;
      
      this.getListbyName(this.page,'');
      //  this.getList(this.page);
      console.log("tamaño lista: "+this.lista.length);
      console.log("size:"+this.maxSize);

  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;     
      this.getListbyName(this.page-1, this.nombre_campo);      
    }
  }

  handlePageChange(event:any) {
    this.page = event;
      console.log("next: "+this.page);  
      this.getListbyName(this.page-1, this.nombre_campo);    
  }

}
