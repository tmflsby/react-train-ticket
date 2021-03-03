import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MenuItem from './MenuItem';
import './index.css';

const Menu = memo((props) => {
  const { show, options, onPress, hideMenu } = props;

  return(
    <div>
      {
        show && (
          <div
            className="menu-mask"
            onClick={() => hideMenu()}
          />
        )
      }
      <div className={classnames('menu', { show })}>
        <div className="menu-title"/>
        <ul>
          {
            options && (
              options.map(option =>
                <MenuItem
                  key={option.value}
                  onPress={onPress}
                  {...option}
                />
              )
            )
          }
        </ul>
      </div>
    </div>
  );
});

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  options: PropTypes.array,
  onPress: PropTypes.func,
  hideMenu: PropTypes.func.isRequired,
};

export default Menu;
