import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SalleService } from 'src/app/services/salle.service';
import { Salle} from 'src/app/models/salle';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit{
  tableausalles: Array<Salle> = [];
  page: String = 'liste';
  nouvelleSalle: Salle = new Salle();
  salleSelectionnee: Salle| null=null;
  salleSup: Salle | null = null;

  constructor(private salleService: SalleService) { }

  ngOnInit(): void {
    this.getAllsalle();
  }

  getAllsalle() {
    this.salleService.getAllsalle().subscribe((value:Array<Salle>) => {
        this.tableausalles = value;
      },
      (error:String) => {

      },
      () => {

      }
    )


  }

  pageAjout() {
    this.page = 'ajout';
  }


  add() {
      this.salleService.add(this.nouvelleSalle).subscribe(
        (response: Salle) => {
          console.log('Salle ajouté avec succès :', response);
          this.tableausalles.push(response);
          this.nouvelleSalle = new Salle();
        },
        (error: String) => {
          console.log(error);
        }
      );
      this.page = 'liste';
  }

  pageModif(salle: Salle){
    this.salleSelectionnee = salle;
    this.page = 'modifier';
  }

  selectSalle(salle:Salle){
    this.salleSelectionnee=salle;
  }

  update(id:number,salle: Salle){
    if(this.salleSelectionnee){
      this.salleService.update(id,salle).subscribe(
        (response: Salle) => {
          // Mise à jour dans le liste
          const index = this.tableausalles.findIndex(salle => salle.id === response.id);
          if(index !==-1){
            this.tableausalles[index] = response;
          }
          this.salleSelectionnee = null;
          this.page = 'liste';
        },
        (error : String) => {
          console.log(error)
        }
      );
    }
    this.page = 'liste';
  }

  pageSup(salle: Salle){
    this.salleSup = salle
    this.page = 'suppression';
  }

  delete(id: number){
    if(this.salleSup){
      this.salleService.delete(id).subscribe(
        ()=>{
          this.tableausalles = this.tableausalles.filter(salle => salle.id !== id);
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

