import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  
  public jugador: string ='';
  

  constructor(private router: Router) { }
  
   // Navega a la página de selección de dificultad
  irAPaginaDificultad() {
    localStorage.setItem('jugador', this.jugador);
    this.router.navigate(['/nevel'], { queryParams: { jugador: this.jugador } });
    
  }

  ngOnInit() {
    // Obtén el nombre del jugador desde localStorage si existe
    const jugadorLocalStorage = localStorage.getItem('jugador');
    if (jugadorLocalStorage !== null) {
      this.jugador = jugadorLocalStorage;
    }
  }


}
