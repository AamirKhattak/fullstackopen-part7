import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { BlueButton, GreenButton } from '../styled-components/styled-components';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <GreenButton onClick={toggleVisibility}>{props.buttonLabel}</GreenButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <BlueButton onClick={toggleVisibility}>cancel</BlueButton>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
