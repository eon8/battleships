import * as React from 'react';

import './App.css';

import {connect} from "react-redux";

import Battlefield from "./Battlefield";

import * as actions from '../actions';
import {StoreState} from "../reducers";

import {PlayerArea} from "../core/PlayerArea";
import {DotShip} from "../core/ship/DotShip";
import {IShip} from "../core/ship/IShip";
import {LShip} from "../core/ship/LShip";

export interface Props {
  playerField: number[][];
  numberOfMoves: number;
  isGameEnded: boolean;
  startGame?: (ships: any[], options: {}) => void;
  makeAMove?: (x: number, y: number) => void;
}

class App extends React.Component<Props> {
  private makeAMove: (e: Event) => void;

  constructor(props: Props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Battleships</h1>
        </header>

        <h2>
          {this.props.isGameEnded ? (
            `Congratulations, you've destroyed all ships.`
          ) : (
            `Press any key to shoot. (${this.props.numberOfMoves})`
          )}
        </h2>

        <section className="App-body">
          <Battlefield />
        </section>

        <button onClick={this.startGame}>Start game</button>
      </div>
    );
  }

  public startGame() {
    this.componentWillUnmount();

    this.props.startGame!([LShip, IShip, DotShip, DotShip], {width: 10, height: 10});

    this.makeAMove = () => {
      const {x, y} = (new PlayerArea(this.props.playerField)).randomEmptyCell();

      this.props.makeAMove!(x, y);
    };

    document.addEventListener('click', this.makeAMove);
    document.addEventListener('keydown', this.makeAMove);
  }

  public componentWillUpdate(nextProps: Props) {
    if (nextProps.isGameEnded !== this.props.isGameEnded && nextProps.isGameEnded) {
      this.componentWillUnmount();
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.makeAMove);
    document.removeEventListener('keydown', this.makeAMove);
  }
}

export default connect<Props>(({numberOfMoves, isGameEnded, playerField}: StoreState): Props => {
  return {numberOfMoves, isGameEnded, playerField};
}, {
  startGame: (ships: any[], options: {}) => actions.startGame(ships, options),
  makeAMove: (x: number, y: number) => actions.makeAMove(x, y)
})(App);
