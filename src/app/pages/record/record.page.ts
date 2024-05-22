import { Component, OnInit } from '@angular/core';
import {RecordService} from '../../services/record.service'
@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  
  records: any [] =[];
  
  constructor(private recordService: RecordService) { }

  ngOnInit() {
    this.cargarRecords();
  }

  cargarRecords() {
    this.recordService.obtenerRecords().subscribe(data => {
      this.records = data;
    }, error => {
      console.error('Error al obtener los registros', error);
    });
  }  

}
