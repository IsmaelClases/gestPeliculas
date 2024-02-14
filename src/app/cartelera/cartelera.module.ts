import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CarteleraRoutingModule } from './cartelera-routing.module';
import { LayoutPageComponent } from './components/layout-page/layout-page.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Pseudo3dCarouselComponent } from './components/pseudo-3d-carousel/pseudo-3d-carousel.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    CarteleraComponent,
    Pseudo3dCarouselComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CarteleraRoutingModule,
    CarouselModule,
  ],
})
export class CarteleraModule {}
