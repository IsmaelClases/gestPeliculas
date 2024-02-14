import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula';
import { PeliculasService } from '../../services/peliculas.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css'],
})
export class CarteleraComponent implements OnInit {

  public peliculas: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getPeliculas().subscribe((consulta) => {
      this.peliculas = consulta.peliculas;

      // Modificamos las URL para que sean correctas
      this.peliculas.forEach((pelicula, index) => {
        pelicula.poster_path = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
        pelicula.backdrop_path = `https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`;
      });
    });
  }
}
