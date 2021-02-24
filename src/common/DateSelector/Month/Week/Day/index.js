import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { h0 } from '../../../../utils/fp';

const Day = (props) => {
  const { day, onSelect } = props;

  if (!day) {
    return <td className="null"/>;
  }

  const classes = [];

  const now = h0();

  if (day < now) {
    classes.push('disabled');
  }

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push('weekend');
  }

  const dateString = now === day ? '今天' : new Date(day).getDate();

  return(
    <td
      className={classnames(classes)}
      onClick={() => onSelect(day)}
    >
      {dateString}
    </td>
  );
};

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

export default Day;
