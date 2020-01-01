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

  ::-webkit-scrollbar {
    height: 0.5rem;
    width: 0.5rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #c5c5c5;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #969696;
    border-radius: 78px;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
  }
`;

export default GlobalStyle;
