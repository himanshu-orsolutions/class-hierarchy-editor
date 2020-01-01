/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';

import Root from 'containers/Root/Loadable';

import GlobalStyle from '../../global-styles';
import '../../global/animate.css';
import '../../global/bootstrap-utilities.css';

export default function App() {
  return (
    <div>
      <Root />
      <GlobalStyle />
    </div>
  );
}
