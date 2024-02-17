import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, mergeMap, of, tap } from 'rxjs';
import { FavoritasComunicationService } from './favoritas-comunicacion.service';
import {
  Pelicula,
  PeliculaDetalles,
  consultaGeneros,
  consultaPeliculas,
} from '../interfaces/pelicula';
import {
  API_HEADERS,
  URL_API,
  URL_API_SGI,
} from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PeliculasService {
  constructor(
    private http: HttpClient,
    private favoritasComunicationService: FavoritasComunicationService,
  ) {}

  getGeneros(): Observable<consultaGeneros> {
    return this.http.get<consultaGeneros>(
      `${URL_API}genre/movie/list?language=es-ES`,
      API_HEADERS
    );
  }

  getPortada(): Observable<consultaPeliculas> {
    return this.http.get<consultaPeliculas>(
      `${URL_API}trending/movie/week?language=es-ES&page=1`,
      API_HEADERS
    );
  }

  getPeliculas(generoId: number): Observable<consultaPeliculas> {
    return this.http.get<consultaPeliculas>(
      `${URL_API}discover/movie?with_genres=${generoId}&language=es-ES`,
      API_HEADERS
    );
  }

  buscarPeliculasPorNombre(nombre: string): Observable<consultaPeliculas> {
    return this.http.get<consultaPeliculas>(
      `${URL_API}search/movie?query=${nombre}&language=es-ES`,
      API_HEADERS
    );
  }

  getDetallesPelicula(peliculaId: number): Observable<PeliculaDetalles> {
    return this.http.get<PeliculaDetalles>(
      `${URL_API}movie/${peliculaId}?language=es-ES`,
      API_HEADERS
    );
  }

  getFavoritas(): Observable<Pelicula[]> {
    const id_usuario = localStorage.getItem('id_usuario');

    return this.http
      .get<any>(
        `${URL_API_SGI}/peliculas.php?id_usuario=${id_usuario}`,
        API_HEADERS
      )
      .pipe(
        mergeMap((response: any) => {
          if (response.ok && response.data && Array.isArray(response.data)) {
            const observables: Observable<Pelicula>[] = response.data.map(
              (pelicula: any) => {
                const peliculaId: number = pelicula.id_pelicula;

                // Llamar a getDetallesPelicula para obtener los detalles
                return this.getDetallesPelicula(peliculaId).pipe(
                  mergeMap((peliculaDetalles: PeliculaDetalles) => {
                    // Adaptar el objeto a la interfaz Pelicula
                    const adaptedPelicula: Pelicula = {
                      id: peliculaDetalles.id,
                      adult: peliculaDetalles.adult,
                      backdrop_path: peliculaDetalles.backdrop_path,
                      genre_ids: peliculaDetalles.genres.map(
                        (genre) => genre.id
                      ),
                      original_language: peliculaDetalles.original_language,
                      original_title: peliculaDetalles.original_title,
                      overview: peliculaDetalles.overview,
                      popularity: peliculaDetalles.popularity,
                      poster_path: peliculaDetalles.poster_path,
                      release_date: peliculaDetalles.release_date,
                      title: peliculaDetalles.title,
                      video: peliculaDetalles.video,
                      vote_average: peliculaDetalles.vote_average,
                      vote_count: peliculaDetalles.vote_count,
                      favorita: true,
                    };
                    return of(adaptedPelicula);
                  })
                );
              }
            );
            return forkJoin(observables);
          } else {
            return of([] as Pelicula[]);
          }
        }),
        catchError((error) => {
          console.error('Error al procesar la solicitud:', error);
          return of([] as Pelicula[]);
        })
      );
  }

  compruebaFavorita(id_pelicula: number): boolean {
//TODO
    return true
  }

  setFavorita(id_pelicula: number) {
    const id_usuario = localStorage.getItem('id_usuario');
    const body = JSON.stringify({
      id_usuario: id_usuario,
      id_pelicula: id_pelicula,
    });
    return this.http
      .post<any>(`${URL_API_SGI}/peliculas.php`, body, API_HEADERS).pipe(
        tap(() => {
          this.favoritasComunicationService.updateFavoritasStatus();
        })
      );
  }

  deleteFavorita(id_pelicula: number) {
    const id_usuario = localStorage.getItem('id_usuario');
    const url = `${URL_API_SGI}/peliculas.php?id_usuario=${id_usuario}&id_pelicula=${id_pelicula}`;

    return this.http.delete<any>(url, API_HEADERS).pipe(
      tap(() => {
        this.favoritasComunicationService.updateFavoritasStatus();
      })
    );;
  }
}
