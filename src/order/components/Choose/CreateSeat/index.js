import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CreateSeat = memo((props) => {
  const { passengers, updatePassenger, seatType } = props;

  return(
    <div>
      {
        passengers.map(passenger =>
          <p
            key={passenger.id}
            className={classnames('seat', {
              active: passenger.seat === seatType
            })}
            data-text={seatType}
            onClick={() => updatePassenger(passenger.id, {
              seat: seatType
            })}
          >
            &#xe02d;
          </p>
        )
      }
    </div>
  );
});

CreateSeat.propTypes = {
  passengers: PropTypes.array.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  seatType: PropTypes.string.isRequired
};

export default CreateSeat;
