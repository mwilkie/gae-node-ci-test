import { oneOf } from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import './index.scss';

function Button({ size, ...props }) {
  return (
    <button className={classnames('Button', `Button--${size}`)} {...props} />
  );
}

Button.propTypes = {
  size: oneOf(['small', 'medium', 'large'])
};

Button.defaultProps = {
  size: 'medium'
};

export default Button;
