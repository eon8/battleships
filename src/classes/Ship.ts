export interface Drownable {
  isDrown(): boolean;

  sink(): void;
}

export interface Size {
  width: number;
  height: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export type Area = number[][];

export type Rotation = 0 | 90 | 180 | 270;

export abstract class Ship implements Drownable {
  private drown = false;
  private x: number;
  private y: number;

  protected constructor(protected rotation: Rotation) {
  }

  public getRotation(rotation: Rotation) {
    return this.rotation;
  }

  public setPosition({x, y}: Coordinates) {
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

  public abstract getSize(): Size;

  public abstract getArea(): Area;

}