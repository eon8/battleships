import {Area} from "./Area";
import {generateMatrix} from "./Helper";
import {BaseShip} from "./ship/BaseShip";

export class Field {
  private readonly area: Area;

  constructor({width, height}: { width: number, height: number }, private ships: BaseShip []) {

    this.area = new Area(generateMatrix(width, height));

    for (const ship of this.ships) {

      const shipPosition = ship.getPosition();
      const shipArea = ship.getArea();

      shipArea.traverse((value: number, x: number, y: number) => {
        if (value !== Area.EMPTY && this.area.get(x + shipPosition.x, y + shipPosition.y) !== Area.EMPTY) {
          throw new Error('Field has overlapping ships');
        }
        this.area.set(x + shipPosition.x, y + shipPosition.y, value);
      });

    }

    if (this.area.hasCollision()) {
      throw new Error('Field has ship collision');
    }

  }

  public getArea(): number[][] {
    return this.area.export();
  }

  public getShips(): any[] {
    return this.ships.map(ship => ({
      id: ship.getId(),
      x: ship.getPosition().x,
      y: ship.getPosition().y,
      area: ship.getArea().export(),
      isDrown: false
    }));
  }
}
