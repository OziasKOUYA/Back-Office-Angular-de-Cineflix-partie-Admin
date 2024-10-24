import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { Projection } from 'src/app/models/projection';
import { ProjectionService } from 'src/app/services/projection.service';
import {Film} from "../../models/film";





@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  page: string = 'liste';
  tableauTickets: Ticket[] = [];
  projections: Projection[] = [];
  projectionsA: Projection[] = [];
  filmA: Film[] = [];
  filmB: Film[] = [];
  nouveauTickets: Ticket = new Ticket();
  ticketsSelectionne: Ticket | null = null;
  ticketSup: Ticket | null = null;
  Filmaffich: Film | null = null;

  constructor(private ticketservice: TicketService, private projectionservice:ProjectionService) { }

  ngOnInit() {
    this.getAll();
    this.getProjection();
    this.getAllProjection();
  }



  getAll() {
    this.ticketservice.getAll().subscribe(
      (response: Ticket[]) => {
        this.tableauTickets = response;
        console.log(this.tableauTickets);

        this.tableauTickets.forEach(ticket => {
          if (!this.projectionsA[ticket.projection]) {
            this.ticketservice.getUneProjection(ticket.projection).subscribe(projection => {
              this.projectionsA[ticket.projection] = projection;
              this.projectionservice.getUnFilm(projection.film).subscribe(film => {
                  this.filmA[projection.film] = film;
              });
            },
              (error) => {
                console.log(error);
              });
          }
        });


      });
  }

  getProjectionDate(projectionId: number): string {
    return this.projectionsA[projectionId]?.date
  }

  getProjectionHeure(projectionId: number): string {
    return this.projectionsA[projectionId]?.heure
  }

  getFilm(projectionId: number): number {
    return this.projectionsA[projectionId]?.film
  }

  getFilmATitre(projectionId: number): string {
    return this.filmA[projectionId]?.titre
  }


  getFilmBTitre(projectionId: number): string {
    return this.filmB[projectionId]?.titre
  }





  getAllProjection() {
    this.projectionservice.getAll().subscribe(
      (response: Projection[]) => {
        this.projections = response;

        this.projections.forEach(projection => {
          if (!this.filmB[projection.film]) {
                this.projectionservice.getUnFilm(projection.film).subscribe(film => {
                  this.filmB[projection.film] = film;
                });
              }
          });
      }
    );
  }


  getProjection() {
    this.ticketservice.getProjection().subscribe(
      (response: Projection[]) => {
        this.projections = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  pageAjout() {
    this.page = 'ajout';
  }

  add() {
    this.ticketservice.add(this.nouveauTickets).subscribe(
      (response: Ticket) => {
        this.tableauTickets.push(response);
        this.nouveauTickets = new Ticket();
      },
      (error: any) => {
        console.log('Erreur lors de l\'ajout de la ticket :', error);
      }
    );
    this.page = 'liste';
  }

  getUneProjectionFilm(id: number) {
    this.projectionservice.getUnFilm(id).subscribe(
      (response: Film) => {
        this.Filmaffich = response;
      }
    );
    return this.Filmaffich
  }



  pageModif(tickets: Ticket) {
    this.ticketsSelectionne = tickets;
    this.page = 'modifier';
  }

  selectTickets(tickets: Ticket) {
    this.ticketsSelectionne = tickets;
  }

  update(id:number,tickets: Ticket) {
    if (this.ticketsSelectionne) {
      this.ticketservice.update(id, tickets).subscribe(
        (response: Ticket) => {
          const index = this.tableauTickets.findIndex(tickets => tickets.id === response.id);
          if (index !== -1) {
            this.tableauTickets[index] = response;
          }
          this.ticketsSelectionne = null;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.page = 'liste';
  }

  pageSup(ticket: Ticket){
    this.ticketSup = ticket
    this.page = 'suppression';
  }

  delete(id: number){
    if(this.ticketSup){
      this.ticketservice.delete(id).subscribe(
        ()=>{
          this.tableauTickets = this.tableauTickets.filter(ticket => ticket.id !== id);
          this.page = 'liste';
        },
        (error : String) => {
          console.log(error);

        }
      );
    }
    this.page='liste';
  }

  annuler() {
    this.page = 'liste';

    }
}
