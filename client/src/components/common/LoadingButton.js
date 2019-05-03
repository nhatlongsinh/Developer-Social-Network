/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

function LoadingButton({
  type, text, loading, className, ...rest
}) {
  return (
    <button type={type} className={className} disabled={loading} {...rest}>
      {loading && <i className="fas fa-circle-notch fa-spin" />}
      {text}
    </button>
  );
}
LoadingButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  rest: PropTypes.object
};

LoadingButton.defaultProps = {
  className: 'btn btn-info btn-block mt-4'
};
export default LoadingButton;
