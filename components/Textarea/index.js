import { func, string } from 'prop-types';
import React from 'react';
import './index.scss';

function Textarea({ onChange, ...props }) {
  return (
    <textarea
      className="Textarea"
      {...props}
      onChange={({ target }) => onChange(target)}
    />
  );
}

Textarea.propTypes = {
  name: string.isRequired,
  placeholder: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired
};

export default Textarea;
