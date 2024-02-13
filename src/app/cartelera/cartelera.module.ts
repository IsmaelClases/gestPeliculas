import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CarteleraRoutingModule } from './cartelera-routing.module';
import { LayoutPageComponent } from './components/layout-page/layout-page.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { CardPeliculaComponent } from './components/card-pelicula/card-pelicula.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Pseudo3dCarouselComponent } from './components/pseudo-3d-carousel/pseudo-3d-carousel.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    CarteleraComponent,
    CardPeliculaComponent,
    Pseudo3dCarouselComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CarteleraRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CarteleraModule { }
