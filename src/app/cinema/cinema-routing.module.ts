import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaComponent } from './cinema.component';
import { ProjectionComponent } from './projection/projection.component';
import { FilmComponent } from './film/film.component';
import { SalleComponent } from './salle/salle.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: '', component: CinemaComponent,
    children:[
      { path:'film',component:FilmComponent},
      { path:'salle',component:SalleComponent},
      { path:'projection',component:ProjectionComponent},
      { path:'ticket',component:TicketComponent}
    ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemaRoutingModule { }
