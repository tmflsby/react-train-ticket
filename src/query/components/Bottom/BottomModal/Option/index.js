import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';

const Option = memo((props) => {
  const { title, options, checkedMap, update } = props;

  const toggle = useCallback((value) => {
    const newCheckedMap = {...checkedMap};

    if (value in checkedMap) {
      delete newCheckedMap[value];
    } else {
      newCheckedMap[value] = true;
    }

    update(newCheckedMap);
  }, [checkedMap, update]);

  return(
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {
          options.map(option =>
            <Filter
              key={option.value}
              checked={option.value in checkedMap}
              toggle={toggle}
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
  update: PropTypes.func.isRequired
};

export default Option;
