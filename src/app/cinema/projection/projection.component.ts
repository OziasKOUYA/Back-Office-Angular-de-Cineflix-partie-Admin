import { Component, OnInit } from '@angular/core';
import { Projection } from 'src/app/models/projection';
import { ProjectionService } from 'src/app/services/projection.service';
import { Salle } from 'src/app/models/salle';
import { Film } from 'src/app/models/film';
import { SalleService } from 'src/app/services/salle.service';
import { FilmService } from 'src/app/services/film.service';





@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit {
  page: string = 'liste';
  tableauProjections: Projection[] = [];
  salles: Salle[] = [];
  films: Film[] = [];
  sallesA: Salle[] = [];
  filmsA: Film[] = [];
  nouvelleProjections: Projection = new Projection();
  projectionsSelectionne: Projection | null = null;
  projectionsSup: Projection | null = null;
  Salleaffich: Salle | null = null;
  Filmaffich: Film | null = null;

  constructor(private projectionservice: ProjectionService, private salleservice:SalleService, private filmservice:FilmService) { }

  ngOnInit() {
    this.getAll();
    this.getSalles();
    this.getFilm();
    this.getAllSalles();
    this.getAllFilm();
  }



  getAll() {
    this.projectionservice.getAll().subscribe(
      (response: Projection[]) => {
        this.tableauProjections = response;
        console.log(this.tableauProjections);

    response.forEach(projection => {
      if (!this.filmsA[projection.film]) {
        this.projectionservice.getUnFilm(projection.film).subscribe(film => {
          this.filmsA[projection.film] = film;
        });
      }
    });

    response.forEach(projection => {
          if (!this.sallesA[projection.salle]) {
            this.projectionservice.getUneSalle(projection.salle).subscribe(salle => {
              this.sallesA[projection.salle] = salle;
            });
          }
        });
      });
  }

  getFilmTitre(filmId: number): string {
    return this.filmsA[filmId]?.titre || 'Chargement...';
  }

  getSalleLibelle(salleId: number): string {
    return this.sallesA[salleId]?.libelle || 'Chargement...';
  }




  getAllSalles() {
    this.salleservice.getAllsalle().subscribe(
      (response: Salle[]) => {
        this.salles = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }



  getAllFilm() {
    this.filmservice.getAllfilm().subscribe(
      (response: Film[]) => {
        this.films = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getSalles() {
    this.projectionservice.getSalles().subscribe(
      (response: Salle[]) => {
        this.salles = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getFilm() {
    this.projectionservice.getFilm().subscribe(
      (response: Film[]) => {
        this.films = response;
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
      this.projectionservice.add(this.nouvelleProjections).subscribe(
        (response: Projection) => {
          this.tableauProjections.push(response);
          this.nouvelleProjections = new Projection();
          this.page = 'liste';
        },
        (error: any) => {
          console.log('Erreur lors de l\'ajout de la projection :', error);
        }
      );
    }



  pageModif(projections: Projection) {
    this.projectionsSelectionne = projections;
    this.page = 'modifier';
  }

  selectProjections(projections: Projection) {
    this.projectionsSelectionne = projections;
  }

  update(id:number,projections: Projection){
    if(this.projectionsSelectionne){
      this.projectionservice.update(id,projections).subscribe(
        (response: Projection) => {
          // Mise à jour dans le liste
          const index = this.tableauProjections.findIndex(projections => projections.id === response.id);
          if(index !==-1){
            this.tableauProjections[index] = response;
          }
          this.projectionsSelectionne = null;
          this.page = 'liste';
        },
        (error : String) => {
          console.log(error)
        }
      );
    }
    this.page = 'liste';
  }

  pageSup(projections : Projection) {
    this.projectionsSup=projections
    this.page = 'suppression';
  }

  delete(id: number) {
    if(this.projectionsSup){
      this.projectionservice.delete(id).subscribe(
        () => {
          this.tableauProjections = this.tableauProjections.filter(projections => projections.id !== id);
          this.page = 'liste';
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.page = 'liste';
  }

  getProjections(id: number) {
    this.projectionservice.getProjection(id).subscribe(
      (response: Projection) => {
        this.projectionsSelectionne = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUneSalle(id: number) {
    this.projectionservice.getUneSalle(id).subscribe(
      (response: Salle) => {
        this.Salleaffich = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUnFilm(id: number) {
    this.projectionservice.getUnFilm(id).subscribe(
      (response: Film) => {
        this.Filmaffich = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  annuler() {
    this.page = 'liste';
  }
}
