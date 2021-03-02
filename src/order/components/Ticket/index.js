import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Ticket = memo((props) => {
  const { price, type } = props;

  return(
    <div className="ticket">
      <p>
        <span className="ticket-type">{type}</span>
        <span className="ticket-price">{price}</span>
      </p>
      <div className="label">坐席</div>
    </div>
  );
});

Ticket.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string
};

export default Ticket;
