import * as React from 'react';

import './Battlefield.css';

import FieldFactory from '../core/FieldFactory';

import {Area} from "../core/Area";
import {Player} from "../core/Player";
import {Size} from "../core/ship/BaseShip";
import {DotShip} from "../core/ship/DotShip";
import {IShip} from "../core/ship/IShip";
import {LShip} from "../core/ship/LShip";

export interface Props {
  playerField: Area;
  numberOfMoves?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Battlefield({playerField, numberOfMoves = 0, onIncrement, onDecrement}: Props) {
  const name = 'dick';

  match();

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(numberOfMoves)} {playerField.getWidth()}
      </div>
      <div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

// class Battlefield extends React.Component<Props, object> {
//   public startGame() {
//     match();
//   }
//
//   public render() {
//     const name = 'dick';
//     const {playerField, numberOfMoves = 0, onIncrement, onDecrement}: Props = this.props;
//
//     return (
//       <div className="hello">
//         <div className="greeting">
//           Hello {name + getExclamationMarks(numberOfMoves)} {playerField.length}
//         </div>
//         <div>
//           <button onClick={onDecrement}>-</button>
//           <button onClick={onIncrement}>+</button>
//         </div>
//       </div>
//     );
//   }
// }

export default Battlefield;


function match() {
  debugger;

  const fieldSize: Size = {width: 10, height: 10};
  const field = FieldFactory(fieldSize, [LShip, IShip, DotShip, DotShip]);

  const player = new Player(field);

  const eventHandler = () => {
    console.log(player.makeAMove());

    if (field.isGameOver()) {
      clearEvents();

      alert('Game Over');
    }
  };

  const eventTypes = ['keypress', 'click'];
  eventTypes.forEach(type => {
    // debugger;
    document.addEventListener(type, eventHandler)
  });
  const clearEvents = () => eventTypes.forEach(type => {
    // debugger;
    document.removeEventListener(type, eventHandler)
  });
}


// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}