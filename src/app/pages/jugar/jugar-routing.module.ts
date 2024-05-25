import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordPage } from '../record/record.page';
import { JugarPage } from './jugar.page';

const routes: Routes = [
  {
    path: '',
    component: JugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugarPageRoutingModule {}
