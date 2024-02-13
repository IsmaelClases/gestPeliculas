import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Peliculas', icon: 'label', url:'./peliculas' },
    { label: 'Usuarios', icon: 'add', url:'./usuarios' }
  ]

  constructor(
    //private authService: AuthService,
    private router: Router,
  ) {}

  onLogout() {
    console.log('Cerrar Sesión')
    /*
    this.authService.logOut();
    this.router.navigate(['/auth']);
    */
  }

}
