import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { consultaPeliculas } from '../interfaces/pelicula';

@Injectable({ providedIn: 'root' })
export class PeliculasService {

  private baseUrl: string = "https://api.themoviedb.org/3/"
  //constructor(private http: HttpClient) { }

  getPeliculas(): Observable<consultaPeliculas> {
    return of({
      "pagina": 1,
      "peliculas": [
        {
          "adult": false,
          "backdrop_path": "/cnqwv5Uz3UW5f086IWbQKr3ksJr.jpg",
          "genre_ids": [
            28,
            12,
            14
          ],
          "id": 572802,
          "original_language": "en",
          "original_title": "Aquaman and the Lost Kingdom",
          "overview": "Al no poder derrotar a Aquaman la primera vez, Black Manta, todavía impulsado por la necesidad de vengar la muerte de su padre, no se detendrá ante nada para derrotar a Aquaman de una vez por todas. Esta vez Black Manta es más formidable que nunca y ejerce el poder del mítico Tridente Negro, que desata una fuerza antigua y malévola.  Para derrotarlo, Aquaman recurrirá a su hermano encarcelado Orm, el ex rey de la Atlántida, para forjar una alianza improbable. Juntos, deben dejar de lado sus diferencias para proteger su reino y salvar a la familia de Aquaman, y al mundo, de una destrucción irreversible.",
          "popularity": 1088.68,
          "poster_path": "/3OdMJBOGkp62e0DfY4ZykL9RuCP.jpg",
          "release_date": "2023-12-20",
          "title": "Aquaman y El Reino Perdido",
          "video": false,
          "vote_average": 6.909,
          "vote_count": 1604
        },
        {
          "adult": false,
          "backdrop_path": "/ba9TgAO4I8RyA2LljzR3MspHaM9.jpg",
          "genre_ids": [
            28,
            878,
            53
          ],
          "id": 799155,
          "original_language": "hi",
          "original_title": "Attack",
          "overview": "Después de perderlo todo debido a un ataque terrorista, el ex agente del gobierno Arjun Shergill participa en un proyecto que lo convierte en un súper soldado. Entonces, llega el momento de enfrentarse a su pasado y a su deseo de venganza contra el asesino de su amante.",
          "popularity": 81.962,
          "poster_path": "/mJUZAEK6haKyxohs58ZOLqiUb9P.jpg",
          "release_date": "2022-04-01",
          "title": "Misión Ataque",
          "video": false,
          "vote_average": 7.244,
          "vote_count": 127
        },
        {
          "adult": false,
          "backdrop_path": "/ba9TgAO4I8RyA2LljzR3MspHaM9.jpg",
          "genre_ids": [
            28,
            878,
            53
          ],
          "id": 799155,
          "original_language": "hi",
          "original_title": "Attack",
          "overview": "Después de perderlo todo debido a un ataque terrorista, el ex agente del gobierno Arjun Shergill participa en un proyecto que lo convierte en un súper soldado. Entonces, llega el momento de enfrentarse a su pasado y a su deseo de venganza contra el asesino de su amante.",
          "popularity": 81.962,
          "poster_path": "/mJUZAEK6haKyxohs58ZOLqiUb9P.jpg",
          "release_date": "2022-04-01",
          "title": "Misión Ataque",
          "video": false,
          "vote_average": 7.244,
          "vote_count": 127
        },
      ],
      "total_paginas": 500,
      "total_peliculas": 10000
    })
  }
}
