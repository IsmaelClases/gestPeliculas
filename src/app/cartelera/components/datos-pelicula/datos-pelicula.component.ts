import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pelicula, PeliculaDetalles } from '../../interfaces/pelicula';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-datos-pelicula',
  templateUrl: './datos-pelicula.component.html',
  styleUrls: ['./datos-pelicula.component.css'],
})
export class DatosPeliculaComponent implements OnInit {
  peliculaDetalles: PeliculaDetalles | null = null;
  valoracion: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public idPelicula: number,
    public dialogRef: MatDialogRef<DatosPeliculaComponent>,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    this.peliculasService
      .getDetallesPelicula(this.idPelicula)
      .subscribe((detalles: PeliculaDetalles) => {
        if (!detalles) {
          this.dialogRef.close();
          return;
        }
        this.peliculaDetalles = detalles;
        this.valoracion =
          this.peliculaDetalles?.vote_average !== null
            ? Math.floor(this.peliculaDetalles.vote_average * 10)
            : 50;
          console.log(this.peliculaDetalles.favorita)
      });
  }

  setFavorito(pelicula: PeliculaDetalles | null): void {
    if (pelicula)
      this.peliculasService.setFavorita(pelicula.id).subscribe(
        (response) => {
          console.log('Película marcada como favorita:', response);
          pelicula.favorita = true;
        },
        (error) => {
          console.error('Error al marcar como favorita:', error);
        }
      );
  }

  deleteFavorito(pelicula: PeliculaDetalles | null): void {
    if (pelicula)
      this.peliculasService.deleteFavorita(pelicula.id).subscribe(
        (response) => {
          console.log('Película eliminada de favoritos:', response);
          pelicula.favorita = false;
        },
        (error) => {
          console.error('Error al eliminar de favoritos:', error);
        }
      );
  }
}
