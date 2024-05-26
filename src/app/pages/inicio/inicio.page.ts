import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AutenticacionComponent } from 'src/app/components/autenticacion/autenticacion.component';
import { LoginComponent } from 'src/app/components/login/login.component';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  
  public jugador: string ='';
  

  constructor(private router: Router,private modalController: ModalController) { }
  

  async mostrarAutenticacion() {
    const modal = await this.modalController.create({
      component: AutenticacionComponent,
      componentProps: {
        // Puedes pasar cualquier propiedad adicional que necesites al componente de autenticación
        jugador: this.jugador
      }
    });
    modal.onDidDismiss().then((data) => {
      // Recibe el nombre del jugador desde la ventana modal
      if (data && data.data) {
        this.jugador = data.data.nombre;
      }
    });
  
    return await modal.present();
  }
  async mostrarLogin() {
    const modal = await this.modalController.create({
      component: LoginComponent, // El componente de Login
    });
    modal.onDidDismiss().then((data) => {
      // Recibe el nombre del jugador desde la ventana modal
      if (data && data.data) {
        this.jugador = data.data.nombre;
      }
    });

    return await modal.present();
  }
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
