import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import Passenger from './Passenger';
import './index.css';

const Passengers = memo((props) => {
  const {
    passengers, createAdult, createChild, removePassenger, updatePassenger,
    showGenderMenu, showFollowAdultMenu, showTicketTypeMenu
  } = props;

  const nameMap = useMemo(() => {
    const ret = {};

    for (const passenger of passengers) {
      ret[passenger.id] = passenger.name;
    }

    return ret;
  }, [passengers]);

  return(
    <div className="passengers">
      <ul>
        {
          passengers.map(passenger =>
            <Passenger
              key={passenger.id}
              followAdultName={nameMap[passenger.followAdult]}
              onRemove={removePassenger}
              onUpdate={updatePassenger}
              showGenderMenu={showGenderMenu}
              showFollowAdultMenu={showFollowAdultMenu}
              showTicketTypeMenu={showTicketTypeMenu}
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
  createChild: PropTypes.func.isRequired,
  removePassenger: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  showGenderMenu: PropTypes.func.isRequired,
  showFollowAdultMenu: PropTypes.func.isRequired,
  showTicketTypeMenu: PropTypes.func.isRequired
};

export default Passengers;
