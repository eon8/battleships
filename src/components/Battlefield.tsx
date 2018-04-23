import * as React from 'react';

import './Battlefield.css';

export interface Props {
  field: number[][];
}

function Battlefield({field}: Props) {
  return (
    <div className="field">
      {
        field.map((row, rowIndex) => <div className="fieldRow" key={rowIndex}>
          {
            row.map((cell, cellIndex) => <div className={`fieldCell fieldCell--${cell}`} key={cellIndex}>
              {cell}
            </div>)
          }
        </div>)
      }
    </div>
  );
}

export default Battlefield;
