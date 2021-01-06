import React from 'react';
import switchSvg from './switch.svg';
import './index.css';

const Journey = (props) => {
  const { from, to, exchangeFromTo, showCitySelector } = props;

  return (
    <div className="journey">
      <div
        className="journey-station"
        onClick={() => showCitySelector(true)}
      >
        <input
          className="journey-input journey-from"
          type="text"
          readOnly
          name="from"
          value={from}
        />
      </div>
      <div
        className="journey-switch"
        onClick={() => exchangeFromTo()}
      >
        <img src={switchSvg} alt="switch" width="70" height="40"/>
      </div>
      <div
        className="journey-station"
        onClick={() => showCitySelector(false)}
      >
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div>
  );
};

export default Journey;
