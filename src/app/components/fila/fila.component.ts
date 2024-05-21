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
  @Output() verificarFilaEvent = new EventEmitter<void>(); // se emite cuando se quiere verificar una fila
  @ViewChildren(CeldaComponent) celdas!: QueryList<CeldaComponent>;

  constructor() {}

  ngOnInit() {
    console.log(this.palabra)
    this.letras = this.palabra.split('');
    this.celdaWidth = `calc(100% / ${this.palabra.length})`;
  }

// En el método verificarFila del componente FilaComponent
// En el método verificarFila del componente FilaComponent
verificarFila() {
  this.celdas.forEach(celda => celda.onComprobar());
  this.edicionHabilitada = false;
  this.verificada = true; // Marcamos la fila como verificada
  this.actualizarEstadoBotonVerificar();
}
actualizarEstadoBotonVerificar() {
  this.todasCeldasConLetras = this.celdas.toArray().every(celda => celda.opcion.trim() !== '');
  this.verificarFilaEvent.emit(); // Emitir evento cuando las celdas están listas para ser verificadas
}

}
