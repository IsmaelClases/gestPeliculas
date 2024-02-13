import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula';

@Component({
  selector: 'app-card-pelicula',
  templateUrl: './card-pelicula.component.html',
  styleUrls: ['./card-pelicula.component.css']
})
export class CardPeliculaComponent implements OnInit {

  @Input()
  public pelicula!: Pelicula;

  ngOnInit(): void {
    if(!this.pelicula) throw new Error('Pelicula requerida')
  }
}
