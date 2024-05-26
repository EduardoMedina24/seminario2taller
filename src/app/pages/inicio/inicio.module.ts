import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { AutenticacionComponent } from 'src/app/components/autenticacion/autenticacion.component';
import { LoginComponent } from 'src/app/components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage,AutenticacionComponent,LoginComponent]
})
export class InicioPageModule {}
