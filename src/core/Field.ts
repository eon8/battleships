import {Area} from "./Area";
import {generateArea} from "./Helper";
import {BaseShip, Coordinates, Size} from "./ship/BaseShip";

export class Field {
  private readonly area: Area;

  constructor(private size: Size, private ships: BaseShip []) {

    this.area = generateArea(this.size);

    for (const ship of this.ships) {

      const shipPosition = ship.getPosition();
      const shipArea = ship.getArea();

      shipArea.traverse((value: number, x: number, y: number) => {
        if (value !== 0 && this.area.get(x + shipPosition.x, y + shipPosition.y) !== 0) {
          throw new Error('Field has overlapping ships');
        }
        this.area.set(x + shipPosition.x, y + shipPosition.y, value);
      });

    }

    if (this.area.hasCollision()) {
      throw new Error('Field has ship collision');
    }

  }

  public getSize(): Size {
    return this.size;
  }

  public getShipFromCoordinates(coordinates: Coordinates): BaseShip | null {
    const id = this.area.get(coordinates.x, coordinates.y);

    if (id === 0) {
      return null;
    }

    for (const ship of this.ships) {
      if (ship.identify(id)) {
        return ship;
      }
    }

    throw new Error('Unknown ship id was found on field');

  }

  public isGameOver(): boolean {
    return this.ships.every(ship => ship.isDrown());
  }
}
