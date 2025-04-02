import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {

  userLoginOn:boolean=false;
  errorMessage:String="";
  lista:User[]=[];


  constructor(private userService:UserService, private router:Router, private formBuilder:FormBuilder, private loginService:LoginService  ){
 
    
    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })
 


  }

  ngOnInit(): void {
    
    this.userService.getListUsers().subscribe(
      (data) => {
     
      console.log(data);
      if(data.length==0 || !data){
        this.lista = [];
        
      }
      else {
        
        this.lista = data;      
       
      }

      },
      error => {        
          alert(error);
          this.router.navigate(['inicio']);
      // Aquí se debería tratar el error, bien mostrando un mensaje al usuario o de la forma que se desee.
      }
    );
  }


  
  delete(com: any) {

  }


}
