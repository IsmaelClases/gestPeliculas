import { Component, OnInit } from '@angular/core';
import {
  Genero,
  Pelicula,
  consultaGeneros,
  consultaPeliculas,
} from '../../interfaces/pelicula';
import { PeliculasService } from '../../services/peliculas.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css'],
})
export class CarteleraComponent implements OnInit {
  public generos: Genero[] = [];
  public peliculasPorGenero: { [key: number]: Pelicula[] } = {};

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService
      .getGeneros()
      .subscribe((consultaGeneros: consultaGeneros) => {
        this.generos = consultaGeneros.genres;

        // Baraja aleatoriamente los géneros
        const generosBarajados = this.shuffleArray(this.generos);

        const consultasPeliculas = generosBarajados
          .slice(0, 5)
          .map((genero: Genero) => {
            return this.peliculasService.getPeliculas(genero.id);
          });

        forkJoin(consultasPeliculas).subscribe(
          (resultados: consultaPeliculas[]) => {
            // Baraja aleatoriamente los resultados
            const resultadosAleatorios = this.shuffleArray(resultados).slice(0,5);

            resultadosAleatorios.forEach(
              (consultaPeliculas: consultaPeliculas, index: number) => {
                const generoId = this.generos[index].id;
                this.peliculasPorGenero[generoId] =
                  consultaPeliculas.results.slice(0, 9);

                this.peliculasPorGenero[generoId].forEach((pelicula) => {
                  pelicula.poster_path = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
                  pelicula.backdrop_path = `https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`;
                });
              }
            );
          }
        );
      });
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
