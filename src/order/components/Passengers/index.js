import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Passenger from './Passenger';
import './index.css';

const Passengers = memo((props) => {
  const { passengers, createAdult, createChild } = props;

  return(
    <div className="passengers">
      <ul>
        {
          passengers.map(passenger =>
            <Passenger
              key={passenger.id}
              {...passenger}
            />
          )
        }
      </ul>
      <section className="add">
        <div
          className="adult"
          onClick={() => createAdult()}
        >
          添加成人
        </div>
        <div
          className="child"
          onClick={() => createChild()}
        >
          添加儿童
        </div>
      </section>
    </div>
  );
});

Passengers.propTypes = {
  passengers: PropTypes.array.isRequired,
  createAdult: PropTypes.func.isRequired,
  createChild: PropTypes.func.isRequired
};

export default Passengers;
