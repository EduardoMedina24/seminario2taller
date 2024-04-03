import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.scss'],
})
export class CeldaComponent implements OnInit {
  @Input() letra!: string;
  @Input() palabra!: string;
  @Input() enviado: boolean = false;
  @Input() disabled: boolean = false; // Nueva entrada para deshabilitar la celda

  public opcion: string = '';
  public css: string = '';

  constructor() {}

  ngOnInit() {
    return 0;
  }

  onComprobar() {
    if (!this.disabled) { // Solo comprobar si la celda no está deshabilitada
      if (this.opcion === this.letra) {
        this.css = 'acierto';
      } else {
        if (this.palabra.includes(this.opcion)) {
          this.css = 'casi';
        } else {
          this.css = 'fallo';
        }
      }
    }
  }
}

