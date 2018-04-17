import {Ship, Size} from "./Ship";

export class Field {
  constructor(private size: Size, private ships: Ship []) {

  }

  public getSize(): Size {
    return this.size;
  }

  public validate(): boolean {
    return !!this.ships;
  }
}
