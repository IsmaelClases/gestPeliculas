import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarteleraRoutingModule } from './cartelera-routing.module';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Pseudo3dCarouselComponent } from './components/pseudo-3d-carousel/pseudo-3d-carousel.component';
import { DatosPeliculaComponent } from './components/datos-pelicula/datos-pelicula.component';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [
    LayoutPageComponent,
    CarteleraComponent,
    Pseudo3dCarouselComponent,
    DatosPeliculaComponent,
  ],
  imports: [
    NgCircleProgressModule.forRoot({
      backgroundColor: '#3f51b5',
      radius: 20,
      outerStrokeWidth: 3,
      innerStrokeWidth: 3,
      maxPercent: 100,
      titleFontSize: '14',
      unitsColor: '#FFFFFF',
      outerStrokeColor: '#FFFFFF',
      innerStrokeColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      showSubtitle: false,
      showInnerStroke: false,
      startFromZero: false,
    }),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CarteleraRoutingModule,
    CarouselModule,
    FormsModule,
  ],
})
export class CarteleraModule {}
