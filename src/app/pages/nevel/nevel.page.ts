import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nevel',
  templateUrl: './nevel.page.html',
  styleUrls: ['./nevel.page.scss'],
})
export class NevelPage implements OnInit {
  public nivel: number = 0
  jugador: string = '';
  public audioMuted: boolean = false;
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
  public opciones: any[] =[
    {id: 1, name:'Fácil',color: 'success'},
    {id: 2, name:'Normal',color: 'warning'},
    {id: 3, name:'Difícil',color: 'danger'},

  ]

  constructor(private route: ActivatedRoute,
    public router: Router ) {
    
  }


  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.jugador = params['jugador'];
    });
    const jugadorLocalStorage = localStorage.getItem('jugador');
    if (jugadorLocalStorage !== null) {
      this.jugador = jugadorLocalStorage;
    }
  }

  onSelectNivel(id: number){
    // console.log(id)
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.pause();
    }
    this.router.navigate(['jugar',id], { queryParams: { jugador: this.jugador }});
  }
  ngOnDestroy() {
    // Detener la reproducción cuando el componente se destruye
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.pause();
    }
  }
  toggleAudio() {
    this.audioMuted = !this.audioMuted;
    if (this.audioPlayer) {
      // Alternar el valor del atributo "muted" en el elemento de audio
      this.audioPlayer.nativeElement.muted = this.audioMuted;
    }
  }
    ionViewWillEnter() {
    // Reproducir el audio cada vez que se active la vista
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.play();
    }
  }
  
}
