import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function StyledTextField(props) {
  const { value, onChange, error, label, className } = props;
  const hasError = error !== undefined;

  function onTextFieldChange(event) {
    onChange(event.target.value);
  }
  return (
    <TextField
      error={hasError}
      value={value}
      onChange={onTextFieldChange}
      label={label}
      className={className}
    />
  );
}

StyledTextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

StyledTextField.defaultProps = {
  value: '',
  error: undefined,
  className: undefined,
  label: undefined,
};

export default StyledTextField;
