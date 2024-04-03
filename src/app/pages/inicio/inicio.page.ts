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
    this.router.navigate(['/nevel'], { queryParams: { jugador: this.jugador } });
  }

  ngOnInit() {
    return 0
  }



}
