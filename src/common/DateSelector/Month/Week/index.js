import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

const Week = (props) => {
  const { days, onSelect } = props;

  return(
    <tr className="date-table-days">
      {
        days.map((day, index) =>
          <Day
            key={index}
            day={day}
            onSelect={onSelect}
          />
        )
      }
    </tr>
  );
};

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Week;
