import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { ComercianteService } from 'src/app/services/comerciante/comerciante.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userLoginOn:boolean=false;
  constructor(private loginService:LoginService, private comercianteService:ComercianteService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

  }

  
  downloadCSV():void{

    console.log("download csv");
    const fileName ='reporte_'+Math.random()+'.csv';
    this.comercianteService.getCSV().subscribe( (res:any)=>
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
      }
      
    )

  }

}
