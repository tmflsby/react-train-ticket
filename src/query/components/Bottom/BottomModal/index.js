import React, { useState, useMemo, useReducer, memo} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Option from './Option';
import Slider from './Slider';

const checkedReducer = (state, action) => {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case 'toggle':
      newState = {...state};

      if (payload in newState) {
        delete newState[payload];
      } else {
        newState[payload] = true;
      }

      return newState;
    case 'reset':
      return {};
    default:
  }

  return state;
};

const BottomModal = memo((props) => {
  const {
    ticketTypes, trainTypes, departStations, arriveStations,
    checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations,
    departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd,
    setCheckedTicketTypes, setCheckedTrainTypes, setCheckedDepartStations, setCheckedArriveStations,
    setDepartTimeStart, setDepartTimeEnd, setArriveTimeStart, setArriveTimeEnd, toggleIsFiltersVisible
  } = props;

  const [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(
    checkedReducer,
    checkedTicketTypes,
    checkedTicketTypes => ({
      ...checkedTicketTypes,
    })
  );

  const [localCheckedTrainTypes, localCheckedTrainTypesDispatch] = useReducer(
    checkedReducer,
    checkedTrainTypes,
    checkedTrainTypes => ({
      ...checkedTrainTypes
    })
  );

  const [localCheckedDepartStations, localCheckedDepartStationsDispatch] = useReducer(
    checkedReducer,
    checkedDepartStations,
    checkedDepartStations => ({
      ...checkedDepartStations
    })
  );

  const [localCheckedArriveStations, localCheckedArriveStationsDispatch] = useReducer(
    checkedReducer,
    checkedArriveStations,
    checkedArriveStations => ({
      ...checkedArriveStations
    })
  );

  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);

  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);

  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);

  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      dispatch: localCheckedTicketTypesDispatch
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      dispatch: localCheckedTrainTypesDispatch
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      dispatch: localCheckedDepartStationsDispatch
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      dispatch: localCheckedArriveStationsDispatch
    }
  ];

  const sure = () => {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTrainTypes(localCheckedTrainTypes);
    setCheckedDepartStations(localCheckedDepartStations);
    setCheckedArriveStations(localCheckedArriveStations);

    setDepartTimeStart(localDepartTimeStart);
    setDepartTimeEnd(localDepartTimeEnd);
    setArriveTimeStart(localArriveTimeStart);
    setArriveTimeEnd(localArriveTimeEnd);
    toggleIsFiltersVisible();
  };

  const isResetDisabled = useMemo(() => (
    Object.keys(localCheckedTicketTypes).length === 0 &&
    Object.keys(localCheckedTrainTypes).length === 0 &&
    Object.keys(localCheckedDepartStations).length === 0 &&
    Object.keys(localCheckedArriveStations).length === 0 &&
    localDepartTimeStart === 0 &&
    localDepartTimeEnd === 24 &&
    localArriveTimeStart === 0 &&
    localArriveTimeEnd === 24
  ), [
    localCheckedTicketTypes, localCheckedTrainTypes,
    localCheckedDepartStations, localCheckedArriveStations,
    localDepartTimeStart, localDepartTimeEnd,
    localArriveTimeStart, localArriveTimeEnd
  ]);

  const reset = () => {
    if (isResetDisabled) {
      return;
    }

    localCheckedTicketTypesDispatch({ type: 'reset' });
    localCheckedTrainTypesDispatch({ type: 'reset' });
    localCheckedDepartStationsDispatch({ type: 'reset' });
    localCheckedArriveStationsDispatch({ type: 'reset' });
    setLocalDepartTimeStart(0);
    setLocalDepartTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  };

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span
              className={classnames('reset', {
                disabled: isResetDisabled
              })}
              onClick={reset}
            >
              重置
            </span>
            <span
              className="ok"
              onClick={sure}
            >
              确定
            </span>
          </div>
          <div className="options">
            {
              optionGroup.map(group =>
                <Option
                  key={group.title}
                  {...group}
                />
              )
            }
            <Slider
              title="出发时间"
              currentStartHours={localDepartTimeStart}
              currentEndHours={localDepartTimeEnd}
              onStartChanged={setLocalDepartTimeStart}
              onEndChanged={setLocalDepartTimeEnd}
            />
            <Slider
              title="到达时间"
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChanged={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

BottomModal.propTypes = {
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired
};

export default BottomModal;
