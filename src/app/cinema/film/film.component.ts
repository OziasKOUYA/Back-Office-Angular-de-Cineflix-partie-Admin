import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Film} from 'src/app/models/film';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit{
  tableaufilms: Array<Film> = [];
  page: String = 'liste';
  nouveauFilm: Film = new Film();
  filmSelectionnee: Film = new Film();
  filmSup: Film | null = null;
  selectedFile: File | null = null;
  selectedFiles: File | null = null;
  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.getAllfilm();
  }

  getAllfilm() {
    this.filmService.getAllfilm().subscribe((value:Array<Film>) => {
        this.tableaufilms = value;
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

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileChangeEdit(event: any) {
    this.selectedFiles  = event.target.files[0];
    if (this.selectedFiles) {
      this.filmSelectionnee.affiche = this.selectedFiles.name; // Met à jour le nom de l'affiche
    }
  }

  extractFileName(url: string): string {
    // Extraire le nom de fichier de l'URL
    return url ? url.split('/').pop() ?? 'Aucune affiche' : 'Aucune affiche';
  }


  add() {
    if (this.selectedFile) {
      this.filmService.add(this.nouveauFilm, this.selectedFile).subscribe(
        (response: Film) => {
          console.log('Film ajouté avec succès :', response);
          this.tableaufilms.push(response);
          this.nouveauFilm = new Film();
          this.selectedFile = null;
        },
        (error: String) => {
          console.log(error);
        }
      );
      this.page = 'liste';
    } else {
      console.log('Aucun fichier sélectionné');
    }
  }

  pageModif(film: Film){
    this.filmSelectionnee = film;
    this.page = 'modifier';
  }

  update(id:number,film: Film){
    if(this.selectedFiles){
    if(this.filmSelectionnee){
      this.filmService.update(id,film,this.selectedFiles).subscribe(
        (response: Film) => {
          // Mise à jour dans le liste
          const index = this.tableaufilms.findIndex(film => film.id === response.id);
          if(index !==-1){
            this.tableaufilms[index] = response;
          }
          this.filmSelectionnee = new Film();
          this.page = 'liste';
          this.selectedFile = null;
        },
        (error : String) => {
          console.log(error)
        }
      );
    }
    this.page = 'liste';
  }}

  pageSup(film: Film){
    this.filmSup = film
    this.page = 'suppression';
  }

  delete(id: number){
    if(this.filmSup){
      this.filmService.delete(id).subscribe(
        ()=>{
          this.tableaufilms = this.tableaufilms.filter(film => film.id !== id);
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

