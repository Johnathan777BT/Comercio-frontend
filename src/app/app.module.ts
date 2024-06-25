import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { ListComerciantesComponent } from './components/list-comerciantes/list-comerciantes.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CrearComerciantesComponent } from './components/crear-comerciantes/crear-comerciantes.component';
import { CrearEstablecimientosComponent } from './components/crear-establecimientos/crear-establecimientos.component';
import { ContainerEstablecimientoComponent } from './components/container-establecimiento/container-establecimiento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    PersonalDetailsComponent,
    ListComerciantesComponent,
    CrearComerciantesComponent,
    CrearEstablecimientosComponent,
    ContainerEstablecimientoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatInputModule, 
    MatDatepickerModule,
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true},
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DatePipe }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
