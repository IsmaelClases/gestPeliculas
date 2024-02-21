import { Component, OnInit } from '@angular/core';
import {
  Genero,
  Pelicula,
  consultaGeneros,
  consultaPeliculas,
} from '../../interfaces/pelicula';
import { PeliculasService } from '../../services/peliculas.service';
import { forkJoin } from 'rxjs';
import { FavoritasComunicationService } from '../../services/favoritas-comunicacion.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css'],
})
export class CarteleraComponent implements OnInit {
  public generos: Genero[] = [];
  public allGeneros: Genero[] = [];
  public peliculasPorGenero: { [key: number]: Pelicula[] } = {};

  public terminoBusqueda: string = '';
  public peliculasBuscadas: Pelicula[] = [];
  public peliculasFavs: Pelicula[] = [];
  public carouselActivado: boolean = false;

  constructor(
    private peliculasService: PeliculasService,
    private favoritasComunicationService: FavoritasComunicationService,
  ) { }

  ngOnInit(): void {
    this.peliculasService
      .getGeneros()
      .subscribe((consultaGeneros: consultaGeneros) => {
        this.allGeneros = consultaGeneros.genres;

        // Baraja aleatoriamente los géneros
        this.generos = this.shuffleArray([...this.allGeneros]).slice(0, 5);

        this.generos.forEach((genero: Genero) => {
          this.peliculasService
            .getPeliculas(genero.id)
            .subscribe((consultaPeliculas: consultaPeliculas) => {
              const generoId = genero.id;

              this.peliculasPorGenero[generoId] =
                consultaPeliculas.results.slice(0, 9);

              this.peliculasPorGenero[generoId].forEach((pelicula) => {
                pelicula.poster_path = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
                pelicula.backdrop_path = `https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`;
                //Comprobar si es favorita
                this.peliculasService.compruebaFavorita(pelicula.id).subscribe((esFavorita) => {
                    pelicula.favorita = esFavorita;
                });
              });
            });
        });
      });

    this.favoritasComunicationService.getFavoritasStatus().subscribe(() => {
      this.getFavoritas();
    });
  }

  getFavoritas() {
    this.peliculasService.getFavoritas().subscribe(
      (favoritas: Pelicula[]) => {
        this.peliculasFavs = favoritas;
        this.peliculasFavs.forEach((pelicula) => {
          pelicula.poster_path = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
          pelicula.backdrop_path = `https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`;
        });
      },
      (error) => {
        console.error('Error al obtener las películas favoritas:', error);
      }
    );
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  buscarPeliculas(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.peliculasService
        .buscarPeliculasPorNombre(this.terminoBusqueda)
        .subscribe(
          (resultados: any) => {
            this.peliculasBuscadas = [];
            if (resultados && resultados.results) {
              this.peliculasBuscadas = resultados.results.slice(0, 9);

              this.peliculasBuscadas.forEach((pelicula: any) => {
                pelicula.poster_path = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
                pelicula.backdrop_path = `https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`;
                this.peliculasService.compruebaFavorita(pelicula.id).subscribe((esFavorita) => {
                    pelicula.favorita = esFavorita;
                });
              });
            }

            this.activarCarousel();
          },
          (error: any) => {
            console.error('Error al buscar películas:', error);
          }
        );
    }
  }

  activarCarousel(): void {
    this.carouselActivado = true;
  }
}
