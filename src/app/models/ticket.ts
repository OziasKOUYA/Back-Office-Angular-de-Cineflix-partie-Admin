import { Projection } from './projection';
export class Ticket {

  id:number;
  numero :number;
  type :string;
  prix : number;
  projection :number;

  constructor(){
    this.id=0;
    this.numero=0;
    this.type="";
    this.prix=0;
    this.projection=0;

  }

}
