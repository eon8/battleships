import {Area, Coordinates, Ship, Size} from "./Ship";

export class Field {
  constructor(private size: Size, private ships: Ship []) {

  }

  public getSize(): Size {
    return this.size;
  }

  public getArea(validate: boolean = false): Area {

    const area: Area = new Array(this.size.height).fill(0).map(() => {
      return new Array(this.size.width).fill(0);
    });

    for (const ship of this.ships) {

      const shipPosition = ship.getPosition();
      const shipArea = ship.getArea();

      for (let i = 0; i < shipArea.length; i++) {
        for (let j = 0; j < shipArea[i].length; j++) {
          if (validate && shipArea[i][j] === 1 && area[i + shipPosition.y][j + shipPosition.x] === 1) {
            throw new Error('Cell already contains a ship');
          }
          area[i + shipPosition.y][j + shipPosition.x] = shipArea[i][j];
        }
      }

    }

    return area;

  }

  public getShipFromCoordinates(coordinates: Coordinates): Ship | null {

    for (const ship of this.ships) {

      const shipPosition = ship.getPosition();
      const shipSize = ship.getSize();
      const shipArea = ship.getArea();

      if (coordinates.x >= shipPosition.x && coordinates.x < shipPosition.x + shipSize.width) {
        if (coordinates.y >= shipPosition.y && coordinates.y < shipPosition.y + shipSize.height) {
          if (shipArea[coordinates.y - shipPosition.y][coordinates.x - shipPosition.x] === 1) {
            return ship;
          }
        }
      }

    }

    return null;

  }

  public isGameOver(): boolean {
    return this.ships.every(ship => ship.isDrown());
  }

  public validate(): boolean {
    try {
      this.getArea(true);
      return true;
    } catch (e) {
      return false;
    }
  }
}
