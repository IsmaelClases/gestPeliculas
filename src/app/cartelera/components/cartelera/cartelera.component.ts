import { Component, OnInit } from '@angular/core';
import { Pelicula, consultaPeliculas } from '../../interfaces/pelicula';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {

  public peliculas: Pelicula[] = [];

  constructor(
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {
    this.peliculasService.getPeliculas().subscribe( consulta => {
      this.peliculas = consulta.peliculas
    })
  }
}
