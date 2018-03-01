import { func, string } from 'prop-types';
import React from 'react';
import './index.scss';

function Input({ onChange, ...props }) {
  return (
    <input
      {...props}
      className="Input"
      onChange={({ target }) => onChange(target)}
    />
  );
}

Input.propTypes = {
  name: string.isRequired,
  placeholder: string.isRequired,
  type: string,
  value: string.isRequired,
  onChange: func.isRequired
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
