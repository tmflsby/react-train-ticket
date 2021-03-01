import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ScheduleRow = memo((props) => {
  const {
    index, station, arriveTime, departTime, stay,
    isStartStation, isEndStation, isDepartStation, isArriveStation,
    beforeDepartStation, afterArriveStation,
  } = props;

  return(
    <li>
      <div
        className={
          classnames('icon', {
            'icon-red': isDepartStation || isArriveStation
          })
        }
      >
        {
          isDepartStation ? '出' : isArriveStation ? '到' : String(index).padStart(2, '0')
        }
      </div>
      <div
        className={
          classnames('row', {
            'grey': beforeDepartStation || afterArriveStation
          })
        }
      >
        <span
          className={
            classnames('station', {
              'red': isArriveStation || isDepartStation
            })
          }
        >
          {station}
        </span>
        <span
          className={
            classnames('arrtime', {
              red: isArriveStation
            })
          }
        >
          {isStartStation ? '始发站' : arriveTime}
        </span>
        <span
          className={
            classnames('deptime', {
              red: isDepartStation
            })
          }
        >
          {isEndStation ? '终到站' : departTime}
        </span>
        <span className="stoptime">
          {isStartStation || isEndStation ? '-' : stay + '分'}
        </span>
      </div>
    </li>
  );
});

ScheduleRow.propTypes = {
  index: PropTypes.number.isRequired,
  station: PropTypes.string.isRequired,
  arriveTime: PropTypes.string,
  departTime: PropTypes.string,
  stay: PropTypes.number,
  isStartStation: PropTypes.bool.isRequired,
  isEndStation: PropTypes.bool.isRequired,
  isDepartStation: PropTypes.bool.isRequired,
  isArriveStation: PropTypes.bool.isRequired,
  beforeDepartStation: PropTypes.bool.isRequired,
  afterArriveStation: PropTypes.bool.isRequired,
};

export default ScheduleRow;
