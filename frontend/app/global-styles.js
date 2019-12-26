import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 15px;
    color: #2b2b2b;
    font-weight: 300;
    line-height: 26px;
    letter-spacing: 0.5px;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  h1, h2, h3, h4, h5, button {
    user-select: none; 
  }
`;

export default GlobalStyle;
