import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import Seat from './Seat';
import './index.css';

const Candidate = memo((props) => {
  const { tickets } = props;

  const [expandedIndex, setExpandedIndex] = useState(-1);

  const onToggle = useCallback(index => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  }, [expandedIndex]);

  return(
    <div className="candidate">
      <ul>
        {
          tickets.map((ticket, index) =>
            <Seat
              key={ticket.type}
              expanded={expandedIndex === index}
              onToggle={onToggle}
              index={index}
              {...ticket}
            />
          )
        }
      </ul>
    </div>
  );
});

Candidate.propTypes = {
  tickets: PropTypes.array.isRequired
};

export default Candidate;
