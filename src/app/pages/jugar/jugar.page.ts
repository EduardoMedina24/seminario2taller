import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilaComponent } from 'src/app/components/fila/fila.component';
import { ViewChild, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  
  jugador: string = '';
  id: number = 0
  public nivel: any
  @ViewChildren(FilaComponent) filas!: QueryList<FilaComponent>;
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
  public botonEnviarHabilitado: boolean = false;
  public filaActual: number = 0; // Variable para rastrear la fila actualmente habilitada
  public ganaste: boolean = false; // Variable para rastrear si el juego se ha ganado
  public perdiste: boolean = false;
  public iteraciones: number[] = []
  public palabras: string[] = []
  public shuffledWords: string[] = [];
  public palabra: string = ''
  public enviado: boolean = false;
  public audioMuted: boolean = false;
  tiempoTranscurrido: number = 0;
  cronometro: any;
  public opciones: any = [
    { id: 1, name: 'Fácil', opc: 7, color: 'success' },
    { id: 2, name: 'Normal', opc: 5, color: 'warning' },
    { id: 3, name: 'Difícil', opc: 2, color: 'danger' },
  ]



  constructor(private route: ActivatedRoute,
    public activedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  enviar() {
    if (this.filaActual < this.nivel.opc) {
      this.filas.toArray()[this.filaActual].verificarFila();
      this.filaActual++; // Incrementar el índice de la fila actualmente habilitada
      // Verificar si es la última fila para activar el botón de enviar
      if (this.filaActual === this.nivel.opc) {
        if (!this.filas.toArray()[this.filaActual - 1].celdas.toArray().every(celda => celda.css === 'acierto')) {
          // Si no todas las celdas de la última fila están en acierto, mostrar mensaje de "Perdiste"
          this.perdiste = true;
          setTimeout(() => {
            this.router.navigate(['/nevel'], { queryParams: { jugador: this.jugador } }); // Redireccionar a la página "nevel" y pasar el jugador como parámetro
          }, 3000);
        } else {
          this.botonEnviarHabilitado = true;
        }
      }
    } else {
      console.log("¡Última fila alcanzada!");
    }
  }

  iniciarCronometro() {
    this.cronometro = setInterval(() => {
      this.tiempoTranscurrido++;
    }, 1000); // Incrementar el tiempo cada segundo
  }

  detenerCronometro() {
    clearInterval(this.cronometro);
  }


  actualizarEstadoBotonEnviar() {
    console.log('Fila actual:', this.filaActual);
    this.botonEnviarHabilitado = this.filas.some(
      (fila) => fila.todasCeldasConLetras && !fila.verificada
    );

    // Verificar si todas las celdas de la fila actual están en acierto
    if (
      this.filas.toArray()[this.filaActual].verificada &&
      this.filas.toArray()[this.filaActual].celdas.toArray().every(
        (celda) => celda.css === 'acierto'
      )
    ) { this.detenerCronometro();
      this.ganaste = true;
      this.enviarRegistroGanador(); // Llama a la función para enviar el registro ganador
      setTimeout(() => {
        this.router.navigate(['/nevel'], { queryParams: { jugador: this.jugador } });
      }, 3000);
    }
  }
  async enviarRegistroGanador() {
    try {
      const { value: usuarioEmail } = await Storage.get({ key: 'usuarioEmail' });
      const { value: usuarioNombre } = await Storage.get({ key: 'usuarioNombre' });

      if (!usuarioEmail || !usuarioNombre) {
        console.error('No se pudo obtener el nombre o el correo electrónico del usuario');
        return;
      }

      const data = {
        name: usuarioNombre,
        email: usuarioEmail,
        palabra: this.palabra,
        dificultad: this.nivel.name,
        tiempo: this.tiempoTranscurrido,
      };

      CapacitorHttp.post({
        url: 'http://127.0.0.1:8000/api/record',
        data: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        console.log('Registro guardado con éxito:', response);
      }).catch(error => {
        console.error('Error al guardar el registro:', error);
      });
    } catch (error) {
      console.error('Error al obtener el nombre o el correo electrónico del usuario:', error);
    }
  }





async ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.jugador = params['jugador'];
    });
    this.id = this.activedRoute.snapshot.params['id']
    this.nivel = this.opciones.find((item: any) => item.id == this.id )
    this.iteraciones = Array(this.nivel.opc).fill(0).map((x,i)=>i);
    const options = {
      url: 'http://127.0.0.1:8000/api/palabras',
      // headers: { 'X-Fake-Header': 'Fake-Value' },
      // params: { size: 'XL' },
    };
  
    const response: HttpResponse = await CapacitorHttp.get(options);
    // console.log('response',response.data)
    response.data.forEach((item: any) => {
      this.palabras.push(item.palabra);
      console.log('Palabra agregada:', item.palabra);
    })
    if (!this.shuffledWords || this.shuffledWords.length === 0) {
      this.shuffledWords = [...this.palabras].sort(() => 0.5 - Math.random());
  }
  
  console.log('Palabras barajadas:', this.shuffledWords);
  this.palabra = this.shuffledWords.pop() ?? ''; 
  console.log('Palabra seleccionada:', this.palabra);
  
  if (this.shuffledWords.length === 0) {
      console.log('No hay más palabras para seleccionar.');
  }
  
    console.log(this.iteraciones)
    console.log("Palabra aleatoria seleccionada:", this.palabra);
    localStorage.setItem('jugador', this.jugador);
    this.iniciarCronometro();
  }

  ngAfterViewInit() {
    // Reproducir el audio después de que la vista se haya inicializado
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.play();
    }
  }

  ngOnDestroy() {
    // Detener la reproducción cuando la página se destruye
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.pause();
    }
    this.detenerCronometro();
  }
  toggleAudio() {
    this.audioMuted = !this.audioMuted;
    if (this.audioPlayer) {
      // Alternar el valor del atributo "muted" en el elemento de audio
      this.audioPlayer.nativeElement.muted = this.audioMuted;
    }
  }





}
