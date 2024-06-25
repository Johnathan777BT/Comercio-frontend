import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-container-establecimiento',
  templateUrl: './container-establecimiento.component.html',
  styleUrls: ['./container-establecimiento.component.css']
})
export class ContainerEstablecimientoComponent {


  idCom:number=0;
  userLoginOn:boolean=false;

  constructor(  private router:Router, private activateRoute: ActivatedRoute, private loginService:LoginService){
    
    this.idCom = activateRoute.snapshot.params['id']; 

    
    this.loginService.userLoginOn.subscribe({
    next:(userLoginOn) => {
      this.userLoginOn=userLoginOn;
    }
  })
  }
  
 

}
