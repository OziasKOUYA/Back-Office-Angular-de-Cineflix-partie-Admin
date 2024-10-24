import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaRoutingModule } from './cinema-routing.module';
import { CinemaComponent } from './cinema.component';
import { SalleComponent } from './salle/salle.component';
import { FilmComponent } from './film/film.component';
import { SideComponent } from './side/side.component';
import { ProjectionComponent } from './projection/projection.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { TicketComponent } from './ticket/ticket.component';



@NgModule({
  declarations: [
    CinemaComponent,
    SalleComponent,
    FilmComponent,
    SideComponent,
    ProjectionComponent,
    FooterComponent,
    NavComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    CinemaRoutingModule,
    FormsModule
  ]
})
export class CinemaModule { }

