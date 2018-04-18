import * as React from 'react';

import './Battlefield.css';

import FieldFactory from '../classes/FieldFactory';

import {DotShip} from "../classes/DotShip";
import {IShip} from "../classes/IShip";
import {LShip} from "../classes/LShip";
import {Player} from "../classes/Player";
import {Size} from "../classes/Ship";

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

function Hello({name, enthusiasmLevel = 1}: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  const fieldSize: Size = {width: 10, height: 10};
  const field = FieldFactory(fieldSize, [LShip, IShip, DotShip, DotShip]);

  console.log(field);
  console.log(field.getArea());

  const player = new Player(field);

  const eventHandler = () => {
    console.log(player.makeAMove());
    console.log(player.getArea());

    if (field.isGameOver()) {
      clearEvents();

      alert('Game Over');

      console.log(player.getArea());
    }
  };

  const eventTypes = ['keypress', 'click'];
  eventTypes.forEach(type => document.addEventListener(type, eventHandler));
  const clearEvents = () => eventTypes.forEach(type => document.removeEventListener(type, eventHandler));

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}