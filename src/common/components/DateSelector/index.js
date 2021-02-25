import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Header from '../Header';
import Month from './Month';
import './index.css';

const DateSelector = (props) => {
  const { show, onSelect, onBack } = props;

  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);

  const monthSequence = [now.getTime()];

  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  return(
    <div
      className={classnames('date-selector', {
        hidden: !show
      })}
    >
      <Header title="日期选择" onBack={onBack}/>
      <div className="date-selector-tables">
        {
          monthSequence.map(month =>
            <Month
              key={month}
              startingTimeInMonth={month}
              onSelect={onSelect}
            />
          )
        }
      </div>
    </div>
  );
};

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}

export default DateSelector;
