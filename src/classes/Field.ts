import {Area, Coordinates, Ship, Size} from "./Ship";

import {generateArea} from "./Helper";

export class Field {
  constructor(private size: Size, private ships: Ship []) {

  }

  public getSize(): Size {
    return this.size;
  }

  public getArea(validate: boolean = false): Area {

    const area: Area = generateArea(this.size);

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

      // TODO or we can get ship by its label id, it is more efficient
      if (coordinates.x >= shipPosition.x && coordinates.x < shipPosition.x + shipSize.width) {
        if (coordinates.y >= shipPosition.y && coordinates.y < shipPosition.y + shipSize.height) {
          // TODO move this logic inside of ship?
          if (shipArea[coordinates.y - shipPosition.y][coordinates.x - shipPosition.x] !== 0) {
            return ship;
          }
        }
      }

    }

    return null;

  }

  public shootAt(coordinates:Coordinates): boolean {
    return true;
  }

  public isGameOver(): boolean {
    return this.ships.every(ship => ship.isDrown());
  }

  public validate(): boolean {
    try {
      const area = this.getArea(true);

      for (let i = 0; i < area.length; i++) {
        for (let j = 0; j < area[i].length; j++) {
          if (this.hasCollision(area, i, j)) {
            return false;
          }
        }
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  // Checks cells on the right-down direction only
  private hasCollision(area: Area, i: number, j: number): boolean {
    if (area[i][j] === 0) {
      return false;
    }

    const maxi = area.length - 1;
    const maxj = area[0].length - 1;

    if (j < maxj && area[i][j + 1] !== 0 && area[i][j] !== area[i][j + 1]) {
      return true;
    }

    if (i < maxi && area[i + 1][j] !== 0 && area[i][j] !== area[i + 1][j]) {
      return true;
    }

    if (j < maxj && i < maxi && area[i + 1][j + 1] !== 0 && area[i][j] !== area[i + 1][j + 1]) {
      return true;
    }

    return false;
  }
}
