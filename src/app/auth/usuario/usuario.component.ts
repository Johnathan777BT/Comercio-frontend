import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/services/auth/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  loginError:string="";
  user?:User;
  
  loginForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
    check:['', Validators.required]
  })

  constructor(private formBuilder:FormBuilder, private router:Router, private userService: UserService) { }

  get email(){
    return this.loginForm.controls.email;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }

   save(){

    if(this.loginForm.valid){
      this.loginError="";

     
      this.userService.createUser(this.loginForm.value as unknown as User).subscribe({
        next:() => {
         
          this.user=this.loginForm.value as unknown as User;
          console.log(this.user);
          if(this.user.email != ""){
            alert("Usuario creado con exito");
          }
         
          this.router.navigate(['iniciar-sesion']);
        },
        error:(errorData)=> console.error(errorData)
      })


    }
   }


}
