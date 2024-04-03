import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NevelPageRoutingModule } from './nevel-routing.module';

import { NevelPage } from './nevel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NevelPageRoutingModule
  ],
  declarations: [NevelPage]
})
export class NevelPageModule {}
