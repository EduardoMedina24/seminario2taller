import { Component, Input, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss'],
})
export class FilaComponent implements OnInit {
  @Input() palabra!: string; //Esta propiedad recibe una palabra como entrada desde el componente padre.
  @Input() enviado: boolean = false;
  verificada: boolean = false;

  letras: string[] = []; //almacena las letras de la palabra separadas.
  celdaWidth: string = '';
  edicionHabilitada: boolean = true;
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
  verificarFila(): boolean {
    let todasCorrectas = true;
    this.celdas.forEach(celda => {
      celda.onComprobar();
        if (!celda.correcta) { 
          todasCorrectas = false;
        }
      });
    this.edicionHabilitada = false;
    this.verificada = true; // Marcamos la fila como verificada
    this.actualizarEstadoBotonVerificar();
    return todasCorrectas;
  }
  actualizarEstadoBotonVerificar() {
    this.todasCeldasConLetras = this.celdas.toArray().every(celda => celda.opcion.trim() !== '');
    this.verificarFilaEvent.emit(); // Emitir evento cuando las celdas están listas para ser verificadas
  }

}
