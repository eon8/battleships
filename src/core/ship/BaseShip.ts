import {Area} from '../Area';
import {Counter} from '../Counter';

export type Rotation = 0 | 90 | 180 | 270;

export abstract class BaseShip {
  protected id: number;

  private x: number;
  private y: number;

  public constructor(protected rotation: Rotation) {
    this.id = Counter.getInstance('ship').tick();
  }

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public getPosition(): { x: number, y: number } {
    return {x: this.x, y: this.y};
  }

  public getArea(): Area {
    return new Area(this.getShape());
  }

  public getId(): number {
    return this.id;
  }

  public abstract getShape(): number[][];
}