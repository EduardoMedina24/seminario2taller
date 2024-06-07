import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilaComponent } from 'src/app/components/fila/fila.component';
import { ViewChild, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

interface UsuarioConTiempo {
  name: string;
  tiempo: number;
  email: string; 
}
@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  
  jugador: string = '';
  id: number = 0
  public nivel: any
  public usuariosConTiempos: any[] = []; 
  @ViewChildren(FilaComponent) filas!: QueryList<FilaComponent>;
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
  public botonEnviarHabilitado: boolean = false;
  public filaActual: number = 0; // Variable para rastrear la fila actualmente habilitada
  public ganaste: boolean = false; // Variable para rastrear si el juego se ha ganado
  public perdiste: boolean = false;
  public iteraciones: number[] = []
  public palabras: string[] = []
  public shuffledWords: string[] = [];
  mostrarUsuarios: boolean = false;
  public palabra: string = ''
  public enviado: boolean = false;
  public audioMuted: boolean = false;
  public mostrarFilas: boolean = false;
 
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
          // Si  todas las celdas de la última fila no están en acierto muestra mensaje de "Perdiste"
          this.perdiste = true;
          setTimeout(() => {
            this.router.navigate(['/nevel'], { queryParams: { jugador: this.jugador } }); // Redireccionar a la página "nevel" y pasar el jugador como parámetro
          }, 3000);
        } else {
          this.botonEnviarHabilitado = true;
        }
      }
    } 
    // else {
    //   console.log("¡Última fila alcanzada!");
    // }
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
    // console.log('Fila actual:', this.filaActual);
    this.botonEnviarHabilitado = this.filas.some(
      (fila) => fila.todasCeldasConLetras && !fila.verificada
    );

    // Verifica si todas las celdas de la fila actual están en acierto
    if (
      this.filas.toArray()[this.filaActual].verificada &&
      this.filas.toArray()[this.filaActual].celdas.toArray().every(
        (celda) => celda.css === 'acierto'
      )
    ) { this.detenerCronometro();
      
      setTimeout(() => {
        this.ganaste = true;
        this.verificarYTomarFoto();
      }, 2000);
      this.enviarRegistroGanador(); // Llama a la función para enviar el registro ganador
      setTimeout(() => {
        this.router.navigate(['/nevel'], { queryParams: { jugador: this.jugador } });
      }, 5000);
    }
  }
  async verificarYTomarFoto() {
    await this.obtenerUsuariosConTiempos();
    const usuarioExistente = this.usuariosConTiempos.find((usuario) => usuario.name === this.jugador);
  
  
    if (usuarioExistente) {
      const usuarioExistente = this.usuariosConTiempos.find((usuario) => usuario.name === this.jugador);
      const tiempoUsuarioActual = usuarioExistente.tiempo;
      const tiempoNuevo = this.tiempoTranscurrido;
      await this.verificarHabilitarCamara(tiempoNuevo);
      if (tiempoNuevo < tiempoUsuarioActual) {
        await this.abrirCamara();
      }
    }
  }
  

async verificarHabilitarCamara(tiempoNuevo: number) {

  const usuarioEnTabla = this.usuariosConTiempos.some((usuario) => usuario.name === this.jugador);


  let tiempoUsuarioActual = Infinity;
  if (usuarioEnTabla) {
    const usuarioExistente = this.usuariosConTiempos.find((usuario) => usuario.name === this.jugador);
    tiempoUsuarioActual = usuarioExistente.tiempo;
  }


  if (usuarioEnTabla && tiempoNuevo < tiempoUsuarioActual) {

    await this.abrirCamara();
  } else {
  
    const tiemposUsuarios: number[] = this.usuariosConTiempos.slice(0, 5).map((usuario) => usuario.tiempo);
    const menorQueAlguno = tiemposUsuarios.some((tiempoUsuario) => tiempoNuevo < tiempoUsuario);

    if (menorQueAlguno) {
      await this.abrirCamara();
    }
  }
}

  async enviarRegistroGanador() {
    try {
      const { value: usuarioEmail } = await Preferences.get({ key: 'usuarioEmail' });
      const { value: usuarioNombre } = await Preferences.get({ key: 'usuarioNombre' });

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
      // console.log('Palabra agregada:', item.palabra);
    })
    if (!this.shuffledWords || this.shuffledWords.length === 0) {
      this.shuffledWords = [...this.palabras].sort(() => 0.5 - Math.random());
  }
  
  // console.log('Palabras barajadas:', this.shuffledWords);
  this.palabra = this.shuffledWords.pop() ?? ''; 
  // console.log('Palabra seleccionada:', this.palabra);
  
  if (this.shuffledWords.length === 0) {
      console.log('No hay más palabras para seleccionar.');
  }
  
    // console.log(this.iteraciones)
    console.log("Palabra aleatoria seleccionada:", this.palabra);
    localStorage.setItem('jugador', this.jugador);
    
    await this.obtenerUsuariosConTiempos()
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



 
  async obtenerUsuariosConTiempos() {
    try {
      // Lógica para obtener los usuarios y tiempos 
      const response = await CapacitorHttp.get({
        url: `http://127.0.0.1:8000/api/record?dificultad=${this.nivel.name}`,
      });
  
      if (response.data && response.data.length > 0) {
        // Filtrar los usuarios por dificultad
        const usuariosFiltrados = response.data.filter((usuario: any) => usuario.dificultad === this.nivel.name);
  
        // Eliminar usuarios duplicados basados en su email
        const uniqueUsuarios = this.eliminarUsuariosDuplicados(usuariosFiltrados);
  
        // Ordenar los usuarios filtrados por tiempo de forma ascendente
        this.usuariosConTiempos = uniqueUsuarios.sort((a: UsuarioConTiempo, b: UsuarioConTiempo) => a.tiempo - b.tiempo);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios y tiempos:', error);
    }
  }
  
  eliminarUsuariosDuplicados(usuarios: UsuarioConTiempo[]): UsuarioConTiempo[] {
    const uniqueUsuarios: { [key: string]: UsuarioConTiempo } = {};
    usuarios.forEach((usuario) => {
      if (!uniqueUsuarios[usuario.email] || usuario.tiempo < uniqueUsuarios[usuario.email].tiempo) {
        uniqueUsuarios[usuario.email] = usuario;
      }
    });
    return Object.values(uniqueUsuarios);
  }
  
  

  mostrarFormularioUsuarios() {
    this.mostrarUsuarios = !this.mostrarUsuarios;
  }
  
  iniciarJuego() {
    this.mostrarFilas = true;
    this.iniciarCronometro();
  }
  getFormattedTime(): string {
    const minutes: number = Math.floor(this.tiempoTranscurrido / 60);
    const seconds: number = this.tiempoTranscurrido % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  redirectToNewPage() {
    this.router.navigate(['/nevel']);
  }
  async abrirCamara() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Uri
      });
      console.log('Imagen tomada:', image.webPath);
      // Aquí puedes manejar la lógica para guardar la imagen tomada
    } catch (error) {
      // Manejar el error aquí
      if (error === 'User cancelled photos app') {
        console.log('El usuario canceló la aplicación de fotos.');
      } else {
        console.error('Error al tomar la foto:', error);
      }
    }
  }
}
