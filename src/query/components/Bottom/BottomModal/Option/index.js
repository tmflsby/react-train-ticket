import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';

const Option = memo((props) => {
  const { title, options, checkedMap, dispatch } = props;

  return(
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {
          options.map(option =>
            <Filter
              key={option.value}
              checked={option.value in checkedMap}
              dispatch={dispatch}
              {...option}
            />
          )
        }
      </ul>
    </div>
  );
});

Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Option;
