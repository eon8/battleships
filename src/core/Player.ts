import {Area} from "./Area";
import {Field} from "./Field";
import {Coordinates, Size} from "./ship/BaseShip";

import {generateArea, getRandomInt} from "./Helper";

enum CellTypes {
  Unknown,
  Miss,
  Margin,
  Ship,
  Hit,
}

export class Player {
  private readonly area: Area;
  private readonly size: Size;

  constructor(private field: Field) {
    this.size = field.getSize();
    this.area = generateArea(this.size);
  }

  public makeAMove(): any {
    const coordinates = this.generateRandomCoordinates();
    const ship = this.field.getShipFromCoordinates(coordinates);
    if (ship) {
      const shipArea = ship.getArea();
      const shipPosition = ship.getPosition();

      shipArea.traverse((value: number, x: number, y: number) => {
        if (value !== 0) {
          this.markHit(shipPosition.y + y, shipPosition.x + x);
        }
      });

      ship.sink();
      this.area.set(coordinates.x, coordinates.y, CellTypes.Hit);
      return {...coordinates, hit: true};
    } else {
      this.area.set(coordinates.x, coordinates.y, CellTypes.Miss);
      return {...coordinates, hit: false};
    }
  }

  private markHit(i: number, j: number): void {
    this.markCell(i - 1, j - 1);
    this.markCell(i - 1, j);
    this.markCell(i - 1, j + 1);
    this.markCell(i, j - 1);
    this.markCell(i, j, true);
    this.markCell(i, j + 1);
    this.markCell(i + 1, j - 1);
    this.markCell(i + 1, j);
    this.markCell(i + 1, j + 1);
  }

  private markCell(i: number, j: number, isShip: boolean = false): void {
    if (i >= 0 && i < this.size.height && j >= 0 && j < this.size.width) {
      // TODO simplify
      this.area.set(j,i, isShip ? CellTypes.Ship : (this.area.get(j,i) === CellTypes.Unknown ? CellTypes.Margin : this.area.get(j,i)));
    }
  }

  private generateRandomCoordinates(): Coordinates {
    let coordinates: Coordinates;
    do {
      coordinates = {
        x: getRandomInt(0, this.size.width - 1),
        y: getRandomInt(0, this.size.height - 1)
      }
    } while (this.area.get(coordinates.x, coordinates.y) !== CellTypes.Unknown);
    return coordinates;
  }
}