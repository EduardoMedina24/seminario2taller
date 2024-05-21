import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilaComponent } from 'src/app/components/fila/fila.component';
import { ViewChild, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  jugador: string = '';
  id: number = 0
  public nivel: any
  @ViewChildren(FilaComponent) filas!: QueryList<FilaComponent>;          //Esta anotación se utiliza para obtener una instancia de todos los componentes FilaComponent
  public botonEnviarHabilitado: boolean = false;
  public filaActual: number = 0; // Variable para rastrear la fila actualmente habilitada
  public ganaste: boolean = false; // Variable para rastrear si el juego se ha ganado
  public perdiste: boolean = false;

  public opciones: any =[
    {id: 1, name:'Fácil',opc: 7,color: 'success'},
    {id: 2, name:'Normal',opc: 5,color: 'warning'},
    {id: 3, name:'Difícil',opc: 2,color: 'danger'},
  ]

  public iteraciones: number[] = []

  public palabras: string[] =[
    'daban','panes','dabas',' dedos', 'nubes','palmas','cocos','dados','lucio','enanos','metas','zorro','perro','damas','hijos','limones','tigre','limones'
  ]

  public palabra: string=''
  public enviado: boolean = false;



  enviar() {
    const indexFilaHabilitada = this.filas.toArray().findIndex((fila: FilaComponent) => fila.edicionHabilitada);
    if (indexFilaHabilitada !== -1) {
      this.filas.toArray()[indexFilaHabilitada].verificarFila();
      this.botonEnviarHabilitado = false; // Deshabilitar el botón "Enviar" después de enviar la fila
    }
  }

  actualizarEstadoBotonEnviar() {
    this.botonEnviarHabilitado = this.filas.some(fila => fila.todasCeldasConLetras && !fila.verificada);
  }
  

  constructor(private route: ActivatedRoute,
    public activedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.jugador = params['jugador'];
    });
    this.id = this.activedRoute.snapshot.params['id']
    this.nivel = this.opciones.find((item: any) => item.id == this.id )
    this.iteraciones = Array(this.nivel.opc).fill(0).map((x,i)=>i);
    const rand = Math.ceil( Math.random()*this.palabras.length)
    this.palabra = this.palabras[rand]
    console.log(this.iteraciones)
  }


}
