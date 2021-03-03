import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CreateSeat from './CreateSeat';
import './index.css';

const Choose = memo((props) => {
  const { passengers, updatePassenger } = props;

  const createSeat = (seatType) => (
    <CreateSeat
      passengers={passengers}
      updatePassenger={updatePassenger}
      seatType={seatType}
    />
  );

  return(
    <div className="choose">
      <p className="tip">在线选座</p>
      <div className="container">
        <div className="seats">
          <div>窗</div>
          {createSeat('A')}
          {createSeat('B')}
          {createSeat('C')}
          <div>过道</div>
          {createSeat('D')}
          {createSeat('F')}
          <div>窗</div>
        </div>
      </div>
    </div>
  );
});

Choose.propTypes = {
  passengers: PropTypes.array.isRequired,
  updatePassenger: PropTypes.func.isRequired
};

export default Choose;
