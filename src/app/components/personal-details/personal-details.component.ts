import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NEVER } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { Rol } from 'src/app/services/auth/rol';
import { User } from 'src/app/services/auth/user';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit  {
  errorMessage:String="";
  user?:User;
  rol!:Rol[];
  roles!:Rol[];
  userLoginOn:boolean=false;
  editMode:boolean=false;
  usuario:String="";
  id:String="";
  lista: any[] = [];
  check:boolean=false;
  password_act:string="";

  registerForm=this.formBuilder.group({
    id:[''],
    password:['', Validators.required],
    email:['',Validators.required],
    checkboxes:  new FormArray([]),
    pass: ['',]
  })

  ordersData = [
      { id: 100, name: 'order 1' },
    ];

  validar(e:any){
    this.check = e.target.checked;
  
    if(e.target.checked){
      
      this.registerForm.get('password')!.clearValidators();                         
    } else {      
              
      this.registerForm.get('password')!.addValidators(Validators.required); 
    }
    this.registerForm.get('password')!.updateValueAndValidity();
  }

  get ordersFormArray() {
    return this.registerForm.controls.checkboxes as unknown as FormArray;
  }

  constructor(private userService:UserService,  private activateRoute: ActivatedRoute,  private formBuilder:FormBuilder, private loginService:LoginService  ){
    
    
  var token  = sessionStorage.getItem("token")!;
  const tokenInfo = this.getDecodedAccessToken(token); // decode token
  const expireDate = tokenInfo.exp; // get token expiration dateTime
  this.usuario=tokenInfo.sub;

  if(activateRoute.snapshot.params['id'] == 0){

    this.id= this.usuario.substring(0,1);

  }else{
    this.id = activateRoute.snapshot.params['id']; 
  }
  
console.log("id: "+this.id);

    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })

  }

  private addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }
  
  ngOnInit(): void {
    
   this.userService.getListRoles().subscribe(
    (data) => {
     
      console.log(data);
      if(data.length==0 || !data){
        this.lista = [];			  
			}
			else 
      {  
        this.lista =data;
        this.rol = this.lista;
    
        let i=0;

        for(let item of this.lista)
        {                
          this.rol[i].id = item.id;
          this.rol[i].nombre_rol = item.nombre_rol;
          i++;
        } 

        this.ordersData= this.ordersData.filter(data=>data.id !== 100);
             
        for( let u=0; u < this.lista.length; u++){
           
            var newItems = {id: this.lista[u].id, name: this.lista[u].nombre_rol};
            this.ordersData.push(newItems);            
        }
        this.addCheckboxes();

             

          this.ordersData.forEach((data)=>{                 
            console.log("data name:"+data.name);
          })    
      
      }

    },
    error => {
      console.log("error");
    }
   )

   this.userService.getUser(Number(this.id)).subscribe({
    next: (userData) => {
    
      this.user=userData;
      this.registerForm.controls.id.setValue(userData.id.toString());
      
      // this.registerForm.controls.password.setValue( userData.password);
      this.password_act = userData.password;
      this.registerForm.controls.email.setValue( userData.email);

      const checkboxes = <FormGroup>this.registerForm.get('checkboxes');
           
      let ids:any [] =[];
      for(let u=0; u < userData.roles.length; u++)
      {    
        console.log("roles en database: "+userData.roles[u].id);
        ids[u]= userData.roles[u].nombre_rol;
      }
      
      for(let x=0; x< this.rol.length; x++){
    
        let variable = this.rol[x].nombre_rol; 
       
        for(let u=0; u < ids.length; u++)
          {
            const checkboxes1 = this.registerForm.get('checkboxes') as FormArray;
            const rol_ = checkboxes1.at(x);   
          
            if(ids[u] == variable){
              rol_.setValue(true); break;
            }else{
              rol_.setValue(false);
            }        
          }
    }
    },
    error: (errorData) => {
      this.errorMessage=errorData
    },
    complete: () => {
      console.info("User Data ok");
    }
  })
  }

  
  get password()
  {
    return this.registerForm.controls.password;
  }

  get email()
  {
    return this.registerForm.controls.email;
  }

  savePersonalDetailsData()
  {
    if (this.registerForm.valid)
    {      
        const selectedOrderIds = this.registerForm.value.checkboxes!
          .map((v, i) => v ? this.ordersData[i].id : null)
          .filter(v => v !== null);
        
          console.log("ids: "+selectedOrderIds);
    
          let user = this.registerForm.value as unknown as User;
          this.roles = this.rol;
          this.roles.map((datag,v)=>{
              if( selectedOrderIds[v]!=null) {
                  datag.id= selectedOrderIds[v]!;
                  v++;
              }else{
                datag.id = 0;
              }

              return datag;          
         }); 
         

         this.roles =   this.roles.filter(data=>data.id !== 0);

         this.roles.forEach((data)=>{
          console.log("id: "+data.id+"--");
         });

          user.roles = this.roles;
         
          let ck:number=0;
          if(this.check==true){
            ck=1;  user.password =  this.password_act;
          }
      this.userService.updateUser(this.registerForm.value as unknown as User,ck).subscribe({
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
        },
        error:(errorData)=> console.error(errorData)
      })

    }
  }

  
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

}
