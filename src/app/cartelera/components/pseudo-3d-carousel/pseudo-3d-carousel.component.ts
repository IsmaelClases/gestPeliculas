import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import {
  style,
  animate,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import { Pelicula, Genero, PeliculaDetalles } from '../../interfaces/pelicula';
import { DatosPeliculaComponent } from '../datos-pelicula/datos-pelicula.component';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'pseudo-3d-carousel',
  templateUrl: './pseudo-3d-carousel.component.html',
  styleUrls: ['./pseudo-3d-carousel.component.css'],
})
export class Pseudo3dCarouselComponent {
  @ViewChildren('element') itemsView!: QueryList<ElementRef>;
  private player!: AnimationPlayer;
  peliculas!: Pelicula[];
  length!: number;
  animates!: number[];
  array!: number[];

  @Input() generos: Genero[] = [];
  @Input() radius!: number;
  @Input() timer = 250;
  @Input() top = 80;
  @Input() minScale = 0.5;
  @Input('peliculas') set peliculasInput(value: Pelicula[]) {
    this.peliculas = value;
    this.length = value ? value.length : 0;

    // Verificar si la longitud es válida antes de crear los arrays
    if (this.length > 0) {
      this.array = new Array(this.length).fill(0).map((_x, i) => i);
      this.animates = new Array(this.length * 2 - 2)
        .fill(0)
        .map((_x, i) => i)
        .filter((i) => i <= this.length / 2 || i > (3 * this.length) / 2 - 2);
    } else {
      this.array = [];
      this.animates = [];
    }
  }

  @Output() select: EventEmitter<number> = new EventEmitter<number>();

  cellWidth!: number;
  marginTop = -(this.top * this.minScale - this.top) / 2;

  constructor(
    private builder: AnimationBuilder,
    private dialog: MatDialog,
    private overlay: Overlay,
    private peliculasService: PeliculasService
  ) {}

  indexToFront(index: number) {
    const pos = this.animates[index];
    if (pos !== 0) {
      const steps = pos <= this.length / 2 ? -pos : 2 * this.length - 2 - pos;
      const factor = steps < 0 ? -1 : 1;
      this.animateViews(factor, factor * steps);
    }
    this.select.emit(index);
  }

  animateViews(direction: number, steps = 1) {
    this.animates.forEach((x, index) => {
      const pos = this.getMovement(x, direction, steps, this.length);
      const time = this.timer / pos.length;
      const animations = pos.map((p) =>
        this.getAnimation(p, this.length, time)
      );
      const item = this.itemsView.find((_x, i) => i === index);

      if (item) {
        const myAnimation = this.builder.build(animations);
        this.player = myAnimation.create(item.nativeElement);
        this.player.onDone(() => {
          this.animates[index] = pos[pos.length - 1];
        });
        this.player.play();
      }
    });
  }

  getMovement(posIni: number, incr: number, steps: number, length: number) {
    if (steps === 0) return [posIni];
    const pos = [];
    let index = posIni;
    let cont = 0;
    while (cont < steps) {
      index += incr / 2;
      index = (index + 2 * length - 2) % (2 * length - 2);
      if ((index * 2) % 2 === 0) {
        pos.push(index);
        if (index <= length / 2 || index > (3 * length) / 2 - 2) cont++;
      } else pos.push(index);
    }
    return pos;
  }

  getAnimation(pos: number, length: number, timer: number) {
    const angle = (pos * 2 * Math.PI) / (2 * length - 2);
    const scale =
      (1 + this.minScale) / 2 + ((1 - this.minScale) / 2) * Math.cos(angle);
    const applystyle = {
      transform: `translate(${this.radius * Math.sin(angle)}px,${
        Math.floor(this.top * scale) - this.top
      }px) scale(${scale})`,
      'z-index': Math.floor(100 * scale),
    };
    return animate(`${timer}ms`, style(applystyle));
  }

  prev() {
    this.animateViews(1);
  }
  next() {
    this.animateViews(-1);
  }

  getDimensions(el: HTMLElement) {
    this.cellWidth = el.offsetWidth;
    this.radius = this.radius || this.cellWidth + 10;
    this.marginTop = -(this.top * this.minScale - this.top);
    this.animateViews(1, 0);
  }

  detallePelicula(pelicula: Pelicula): void {
    const dialogRef = this.dialog.open(DatosPeliculaComponent, {
      data: pelicula,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '60%',
      height: '50%',
      backdropClass: 'backdropBackground',
    });
  }

  getGeneroNombre(generoId: number): string {
    const genero = this.generos.find((g) => g.id === generoId);
    return genero ? genero.name : 'Desconocido';
  }

  getListadoGeneros(generoIds: number[]): string {
    const generosNombres = generoIds.map((generoId) =>
      this.getGeneroNombre(generoId)
    );
    return generosNombres.join(', ');
  }

  setFavorito(pelicula: Pelicula): void {
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

  deleteFavorito(pelicula: Pelicula): void {
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
