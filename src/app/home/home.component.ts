import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../shared/commonService';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @Output() valueChange = new EventEmitter();

  loginForm!: FormGroup;
  titulo = 'Acceso CRM RADFPD';
  alerta!: string;
  showSpinner!: boolean;
  error!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async acceder() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      const RESPONSE = await this.authService.doLogin(data).toPromise();
      // console.log(response);
      if (RESPONSE) {
        if (RESPONSE.ok) {
          if (RESPONSE.data.token) {
            localStorage.setItem('id_usuario', RESPONSE.data.id_usuario);
            localStorage.setItem('id_rol', RESPONSE.data.id_rol);
            localStorage.setItem('nombre_publico',RESPONSE.data.nombre_publico);
            localStorage.setItem('token', RESPONSE.data.token);
            this.commonService.headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESPONSE.data.token}`,
            });
            this.router.navigate([`/${RESPONSE.data.accion}`]);
          } else if (RESPONSE.data.valido === 0) {
            this.snackBar.open('Usuario inhabilitado', 'Cerrar', {
              duration: 5000,
            });
          } else if (RESPONSE.data.valido === 1) {
            this.snackBar.open('Usuario o contraseña incorrectas', 'Cerrar', {
              duration: 5000,
            });
          }
        }
      }
    }
  }
}
