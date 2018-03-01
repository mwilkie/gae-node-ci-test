import { element } from 'prop-types';
import React from 'react';
import './index.scss';

// A simple component to add global styles
function Global({ children }) {
  return <React.Fragment>{children}</React.Fragment>;
}

Global.propTypes = {
  children: element.isRequired
};

export default Global;
