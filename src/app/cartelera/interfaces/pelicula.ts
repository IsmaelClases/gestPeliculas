export interface consultaPeliculas {
  pagina: number
  peliculas: Pelicula[]
  total_paginas: number
  total_peliculas: number
}

export interface Pelicula {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
