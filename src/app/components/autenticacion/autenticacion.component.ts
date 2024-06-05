import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.scss'],
})
export class AutenticacionComponent  implements OnInit {
  public nombre: string = '';
  public email: string = '';
  public contrasena: string = '';
  public registroExitoso: boolean = false;
  public mensajeError: string = '';
  constructor(private http: HttpClient, private router: Router,private modalController: ModalController) { }

  ngOnInit() { 
    return 0;
  }

  async register() {
    this.http.post('http://127.0.0.1:8000/api/usuario', { name: this.nombre, email: this.email, password: this.contrasena })
      .subscribe(async (response: any) => {
        console.log('Usuario registrado:', response);
        this.registroExitoso = true;
        await Storage.set({ key: 'usuarioNombre', value: this.nombre });
        await Storage.set({ key: 'usuarioEmail', value: this.email });
        setTimeout(() => {
          this.modalController.dismiss({ nombre: this.nombre });
        }, 3000);
      },
      error => {
        if (error.status === 500) {
          this.mensajeError = 'El correo ya está registrado.';
        } else {
          this.mensajeError = 'Ocurrió un error. Inténtalo de nuevo.';
        }
        setTimeout(() => {
          this.mensajeError = '';
        }, 2000);
      });
  }
  redirectToNewPage() {
    console.log('Cerrando el modal...');
    this.modalController.dismiss();
  }
}
