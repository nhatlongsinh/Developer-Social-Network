import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InputMessage from './InputMessage';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
  disabled,
  info,
  className
}) => {
  const newClassName = classnames(className, {
    'is-invalid': error
  });
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={newClassName}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <InputMessage error={error} info={info} />
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

InputGroup.defaultProps = {
  placeholder: '',
  error: '',
  info: '',
  icon: '',
  className: 'form-control form-control-lg',
  disabled: false
};

export default InputGroup;
