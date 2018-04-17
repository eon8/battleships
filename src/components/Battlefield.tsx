import * as React from 'react';

import './Battlefield.css';

import FieldFactory from '../classes/FieldFactory';
import {LShip} from "../classes/LShip";
import {DotShip} from "../classes/DotShip";
import {IShip} from "../classes/IShip";

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

function Hello({name, enthusiasmLevel = 1}: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  const field = FieldFactory({width: 10, height: 10}, [LShip, IShip, DotShip, DotShip]);

  console.log(field);

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