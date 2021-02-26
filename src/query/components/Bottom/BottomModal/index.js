import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

const BottomModal = memo((props) => {
  const {
    ticketTypes, trainTypes, departStations, arriveStations,
    checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations
  } = props;

  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => ({
    ...checkedTicketTypes
  }));

  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => ({
    ...checkedTrainTypes
  }));

  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(() => ({
    ...checkedDepartStations
  }));

  const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(() => ({
    ...checkedArriveStations
  }));

  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      update: setLocalCheckedTicketTypes
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations
    }
  ];

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className="reset">
              重置
            </span>
            <span className="ok">
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
  checkedArriveStations: PropTypes.object.isRequired
};

export default BottomModal;
