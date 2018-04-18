import {Field} from "./Field";
import {Area, Coordinates, Size} from "./Ship";

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

  public getArea(): Area {
    return this.area;
  }

  public makeAMove(): any {
    const coordinates = this.generateRandomCoordinates();
    const ship = this.field.getShipFromCoordinates(coordinates);
    if (ship) {
      const shipArea = ship.getArea();
      const shipPosition = ship.getPosition();
      for (let i = 0; i < shipArea.length; i++) {
        for (let j = 0; j < shipArea[i].length; j++) {
          // TODO check inside ship?
          if (shipArea[i][j] !== 0) {
            this.markHit(shipPosition.y + i, shipPosition.x + j)
          }
        }
      }
      ship.sink();
      this.area[coordinates.y][coordinates.x] = CellTypes.Hit;
      return {...coordinates, hit: true};
    } else {
      this.area[coordinates.y][coordinates.x] = CellTypes.Miss;
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
      this.area[i][j] = isShip ? CellTypes.Ship : (this.area[i][j] === CellTypes.Unknown ? CellTypes.Margin : this.area[i][j]);
    }
  }

  private generateRandomCoordinates(): Coordinates {
    let coordinates: Coordinates;
    do {
      coordinates = {
        x: getRandomInt(0, this.size.width - 1),
        y: getRandomInt(0, this.size.height - 1)
      }
      // TODO area method to get value from x y
    } while (this.area[coordinates.y][coordinates.x] !== CellTypes.Unknown);
    return coordinates;
  }
}