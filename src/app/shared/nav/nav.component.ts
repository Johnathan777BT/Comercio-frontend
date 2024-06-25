import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn:boolean=false;
  usuario:string = "";
  Roles:string="";

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )

  var token  = sessionStorage.getItem("token")!;
    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    const expireDate = tokenInfo.exp; // get token expiration dateTime
    this.usuario=tokenInfo.sub;
    this.Roles = tokenInfo.roles;
    console.log("tok info"+tokenInfo.roles);



  }

  logout()
  {
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

}
