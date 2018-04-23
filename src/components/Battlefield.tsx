import * as React from 'react';

import './Battlefield.css';

export interface Props {
  playerField: number[][];
}

function Battlefield({playerField}: Props) {
  return (
    <div className="field">
      {
        playerField.map((row, index) => <div className="fieldRow" key={index}>
          {
            row.map((cell, index) => <div className="fieldCell" key={index}>
              {cell}
            </div>)
          }
        </div>)
      }
    </div>
  );
}

export default Battlefield;
