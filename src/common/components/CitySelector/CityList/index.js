import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CitySection from './CitySection';
import AlphaIndex from './AlphaIndex';

const alphabet = Array.from(new Array(26), (ele, index) =>
  String.fromCharCode(65 + index)
);

const CityList = memo((props) => {
  const { sections, onSelect, toAlpha } = props;

  return(
    <div className="city-list">
      <div className="city-cate">
        {
          sections.map(section =>
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          )
        }
      </div>
      <div className="city-index">
        {
          alphabet.map(alpha =>
            <AlphaIndex
              key={alpha}
              alpha={alpha}
              onClick={toAlpha}
            />
          )
        }
      </div>
    </div>
  );
});

CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  toAlpha: PropTypes.func.isRequired
};

export default CityList;
