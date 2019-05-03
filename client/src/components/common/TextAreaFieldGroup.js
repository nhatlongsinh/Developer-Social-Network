import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InputMessage from './InputMessage';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  disabled,
  className
}) => {
  const newClassName = classnames(className, {
    'is-invalid': error
  });
  return (
    <div className="form-group">
      <textarea
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
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

TextAreaFieldGroup.defaultProps = {
  placeholder: '',
  error: '',
  info: '',
  className: 'form-control form-control-lg',
  disabled: false
};
export default TextAreaFieldGroup;
