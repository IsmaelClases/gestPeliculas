import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pelicula } from '../../interfaces/pelicula';

@Component({
  selector: 'app-datos-pelicula',
  templateUrl: './datos-pelicula.component.html',
  styleUrls: ['./datos-pelicula.component.css'],
})
export class DatosPeliculaComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public pelicula: Pelicula,
    public dialogRef: MatDialogRef<DatosPeliculaComponent>
  ) { }

  ngOnInit(): void {

  }
}
