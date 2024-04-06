import { Component, Input, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss'],
})
export class FilaComponent implements OnInit {
  @Input() palabra!: string;
  @Input() enviado: boolean = false;
  @Input() edicionHabilitada: boolean = false; // Agrega esta línea
  verificada: boolean = false;
  letras: string[] = [];
  celdaWidth: string = '';
  todasCeldasConLetras: boolean = false;
  @Output() verificarFilaEvent = new EventEmitter<void>();
  @ViewChildren(CeldaComponent) celdas!: QueryList<CeldaComponent>;

  constructor() {}

  ngOnInit() {
    console.log(this.palabra)
    this.letras = this.palabra.split('');
    this.celdaWidth = `calc(100% / ${this.palabra.length})`;
  }

  verificarFila() {
    this.celdas.forEach(celda => celda.onComprobar());
    this.edicionHabilitada = false;
    this.verificada = true;
    this.actualizarEstadoBotonVerificar();
    console.log('Verificando fila...');
  }

  actualizarEstadoBotonVerificar() {
    this.todasCeldasConLetras = this.celdas.toArray().every(celda => celda.opcion.trim() !== '');
    this.verificarFilaEvent.emit();
  }
}
