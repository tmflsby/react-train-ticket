import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Channel from './Channel';

const Seat = memo((props) => {
  const {
    type, priceMsg, ticketsLeft, channels,
    expanded, onToggle, index
  } = props;

  return(
    <li>
      <div
        className="bar"
        onClick={() => onToggle(index)}
      >
        <span className="seat">{type}</span>
        <span className="price">
          <i>￥</i>
          {priceMsg}
        </span>
        <span className="btn">{expanded ? '预定' : '收起'}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div
        className="channels"
        style={{
          height: expanded ? channels.length * 55 + 'px' : 0
        }}
      >
        {
          channels.map(channel =>
            <Channel
              key={channel.name}
              type={type}
              {...channel}
            />
          )
        }
      </div>
    </li>
  );
});

Seat.propTypes = {
  type: PropTypes.string.isRequired,
  priceMsg: PropTypes.string.isRequired,
  ticketsLeft: PropTypes.string.isRequired,
  channels: PropTypes.array.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default Seat;
