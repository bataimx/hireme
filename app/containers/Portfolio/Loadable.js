/**
 * Asynchronously loads the component for HomePage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

const styles = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: '40px',
  height: '100px',
  margin: 'auto',
  right: 0,
};

export default loadable(() => import('./index'), {
  fallback: <div style={styles} ><LoadingIndicator/></div>,
});
