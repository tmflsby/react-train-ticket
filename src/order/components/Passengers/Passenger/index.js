import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Passenger = memo((props) => {
  return(
    <li>{props.id}</li>
  );
});

Passenger.propTypes = {

};

export default Passenger;
