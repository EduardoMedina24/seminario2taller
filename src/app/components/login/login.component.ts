import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  public email: string = '';
  public password: string = '';
  public mensajeError: string = '';

  constructor(private http: HttpClient, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    return 0;
  }


  async login() {
    this.http.post('http://127.0.0.1:8000/api/login', { email: this.email, password: this.password })
      .subscribe(async (response: any) => {
        console.log('Usuario autenticado:', response);
      
        await Storage.set({ key: 'usuarioEmail', value: response.user.email }); // Guardar el correo electrónico del usuario
        await Storage.set({ key: 'usuarioNombre', value: response.user.name }); // Guardar el nombre del usuario
  
        setTimeout(() => {
          this.modalController.dismiss({ nombre: response.user.name }); // Cerrar el modal y pasar el nombre del usuario
        }, 2000);
  
        this.router.navigate(['/inicio']); // Redirigir al usuario a la página del dashboard
      }, error => {
        this.mensajeError = 'Credenciales inválidas';
        // Limpiar el mensaje de error después de 2 segundos
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
