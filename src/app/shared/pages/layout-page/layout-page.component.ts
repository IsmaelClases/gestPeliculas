import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent implements OnInit {
  public id_rol: string | null = null;
  public sidebarItems: { label: string; icon: string; url: string }[] = [];
  public nombre = localStorage.getItem('nombre_publico');
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.sidebarItems = [
      { label: 'Peliculas', icon: 'label', url: '../inicio' },
    ];

    this.id_rol = localStorage.getItem('id_rol');

    if (this.id_rol === '1') {
      this.sidebarItems.push({
        label: 'Usuarios',
        icon: 'supervisor_account',
        url: '../usuarios',
      });
    }
  }

  onLogout() {
    this.authService.logout();
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('id_rol');
    localStorage.removeItem('nombre_publico');
    localStorage.removeItem('token');
    this.router.navigate(['./']);
  }
}
