import * as React from 'react';

import './Battlefield.css';

export interface Props {
  playerField: number[][];
}

function Battlefield({playerField}: Props) {
  return (
    <div className="field">
      {
        playerField[0].length ? playerField.map((row, rowIndex) => <div className="fieldRow" key={rowIndex}>
          {
            row.map((cell, cellIndex) => <div className={`fieldCell fieldCell--${cell}`} key={cellIndex}>
              {cell}
            </div>)
          }
        </div>) : ''
      }
    </div>
  );
}

export default Battlefield;
