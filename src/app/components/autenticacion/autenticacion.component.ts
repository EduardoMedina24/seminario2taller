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
    // Enviar datos al backend Laravel
    this.http.post('http://127.0.0.1:8000/api/usuario', { name: this.nombre, email: this.email, password: this.contrasena })
      .subscribe(async (response: any) => {
        console.log('Usuario registrado:', response);
        // Marcar el registro como exitoso y cerrar la ventana flotante
        this.registroExitoso = true;
        await Storage.set({ key: 'usuarioId', value: response._id }); // Guardar el ID del usuario en Capacitor Storage
        setTimeout(() => {
          this.modalController.dismiss({ nombre: this.nombre }); // Cierra la ventana flotante
        }, 3000);
      },
      error => {
        // Manejar el error de correo duplicado
        if (error.status === 500) {
          this.mensajeError = 'El correo ya está registrado.';
        } else {
          this.mensajeError = 'Ocurrió un error. Inténtalo de nuevo.';
        }
      
        // Limpiar el mensaje de error después de 2 segundos
        setTimeout(() => {
          this.mensajeError = '';
        }, 2000);
      });
  }

}
