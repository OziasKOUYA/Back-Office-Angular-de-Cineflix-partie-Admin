import { Film } from './film';
import { Salle } from './salle';



export class Projection {

  id:number;
  date:string;
  heure:string;
  film:number;
  salle:number;




  constructor(){
    this.id=0;
    this.date="";
    this.heure="";
    this.film=0;
    this.salle=0;


  }
}
