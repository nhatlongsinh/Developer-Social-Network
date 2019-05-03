import React from 'react';
import PropTypes from 'prop-types';

function InputMessage({ error, info }) {
  return (
    <>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
}
InputMessage.propTypes = {
  error: PropTypes.string,
  info: PropTypes.string
};
InputMessage.defaultProps = {
  error: '',
  info: ''
};
export default InputMessage;
