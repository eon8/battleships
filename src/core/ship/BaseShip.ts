import {Area} from "../Area";
import {Counter} from "../Counter";

export interface Size {
  width: number;
  height: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export type Rotation = 0 | 90 | 180 | 270;

export abstract class BaseShip {
  protected id: number;

  private drown = false;
  private x: number;
  private y: number;

  public constructor(protected rotation: Rotation) {
    this.id = Counter.getInstance('ship').tick();
  }

  public identify(id: number): boolean {
    return id === this.id;
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getPosition(): Coordinates {
    return {x: this.x, y: this.y};
  }

  public isDrown() {
    return this.drown;
  }

  public sink() {
    this.drown = true;
  }

  public getArea(): Area {
    return new Area(this.getShape());
  }

  public abstract getShape(): number[][];

}