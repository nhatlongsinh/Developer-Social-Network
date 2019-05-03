import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InputMessage from './InputMessage';

function TextFieldGroup({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
  className
}) {
  const newClassName = classnames(className, {
    'is-invalid': error
  });
  return (
    <div className="form-group">
      <input
        type={type}
        className={newClassName}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <InputMessage error={error} info={info} />
    </div>
  );
}
TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

TextFieldGroup.defaultProps = {
  placeholder: '',
  error: '',
  info: '',
  className: 'form-control form-control-lg',
  disabled: false
};
export default TextFieldGroup;
