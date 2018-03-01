import { arrayOf, func, shape, string } from 'prop-types';
import React from 'react';
import Input from '../Input';
import Textarea from '../Textarea';
import './index.scss';

function renderField(record, onChange) {
  const Field = record.name === 'description' ? Textarea : Input;
  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <div className="InputGroup__field" key={record.name}>
      <label className="InputGroup__field-label">
        <span>{record.label}</span>
        <Field
          name={record.name}
          value={record.value}
          placeholder={record.name}
          onChange={onChange}
        />
      </label>
    </div>
  );
  /* eslint-enable jsx-a11y/label-has-for */
}

function InputGroup({ heading, fields, onChange }) {
  return (
    <div className="InputGroup">
      <h2 className="InputGroup__heading">{heading}</h2>
      <div className="InputGroup__fields">
        {fields.map(record => renderField(record, onChange))}
      </div>
    </div>
  );
}

InputGroup.propTypes = {
  onChange: func.isRequired,
  heading: string.isRequired,
  fields: arrayOf(
    shape({
      name: string,
      value: string,
      label: string
    })
  ).isRequired
};

export default InputGroup;
