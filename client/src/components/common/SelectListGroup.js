/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InputMessage from './InputMessage';

const SelectListGroup = ({
  name, value, error, info, onChange, options, disabled, className
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  const newClassName = classnames(className, {
    'is-invalid': error
  });
  return (
    <div className="form-group">
      <select
        className={newClassName}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {selectOptions}
      </select>
      <InputMessage error={error} info={info} />
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};
SelectListGroup.defaultProps = {
  error: '',
  info: '',
  className: 'form-control form-control-lg',
  disabled: false
};

export default SelectListGroup;
