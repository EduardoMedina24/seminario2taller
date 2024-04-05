import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CeldaComponent } from 'src/app/components/celda/celda.component';
import { FilaComponent } from 'src/app/components/fila/fila.component';

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
  @ViewChild(CeldaComponent) CeldaComponent!: CeldaComponent;
  
  public botonEnviarHabilitado: boolean = false;

  public opciones: any =[
    {id: 1, name:'Fácil',opc: 7,color: 'success'},
    {id: 2, name:'Normal',opc: 5,color: 'warning'},
    {id: 3, name:'Difícil',opc: 2,color: 'danger'},

  ]
  public iteraciones: number[] = []

  public palabras: string[] =[
    'daban','panes','dabas','nubes','palmas','cocos','dados','lucio','enanos','metas','zorro','perro','damas','hijos','limones','tigre','limones'
  ]

  public palabra: string=''
  public enviado: boolean = false;

filaActualIndex = 0;
  enviar() {
    const indexFilaHabilitada = this.filas.toArray().findIndex((fila: FilaComponent) => fila.edicionHabilitada);
    if (indexFilaHabilitada !== -1) {
      this.filas.toArray()[indexFilaHabilitada].verificarFila();
      this.botonEnviarHabilitado = false; // Deshabilitar el botón "Enviar" después de enviar la fila
    }

    if (this.filas && this.filas.toArray().length > 0 && this.filaActualIndex < this.filas.toArray().length) {
      const filaActual = this.filas.toArray()[this.filaActualIndex];
      this.enviado = true;
      
      if (filaActual.verificarFila()) {
        alert('¡Correcto!'); 
      } else {
        this.filaActualIndex++;
        if (this.filaActualIndex >= this.filas.toArray().length) {
          alert('Perdiste')
        }
      }
      this.filaActualIndex+1; 
      if (this.filaActualIndex < this.filas.length) {
        
        setTimeout(() => {
          this.filas.toArray().forEach((fila, index) => fila.edicionHabilitada = false);
          if (this.filas.toArray()[this.filaActualIndex]){
            this.filas.toArray()[this.filaActualIndex].edicionHabilitada = true;
          
          }
        })
      } else {
        alert('Final del juego');
      }
      
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
  ngAfterViewInit(){
    this.filas.changes.subscribe((filas: QueryList<FilaComponent>) => {
      filas.toArray().forEach((fila, index) => fila.edicionHabilitada = index === 0);
    });
    setTimeout(() => {
      this.filas.toArray().forEach((fila, index) => {
        fila.edicionHabilitada = (index === 0); // Solo la primera fila habilitada
      });
      
    });
  }

}
