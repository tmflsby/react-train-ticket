import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './index.css';

const List = memo((props) => {
  const { list } = props;

  return (
    <ul className="list">
      {
        list.map(item =>
          <ListItem
            key={item.trainNumber}
            {...item}
          />
        )
      }
    </ul>
  );
});

List.propTypes = {
  list: PropTypes.array.isRequired
};

export default List;
