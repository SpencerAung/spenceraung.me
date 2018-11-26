import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
// eslint-disable-next-line
const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  a {
    text-decoration: none;
    color: ${theme.blue};

    &:hover {
      color: ${theme.blue};
    }
  }
  h1 {
    font-size: 3rem;
    margin-bottom: 5rem;
  }
  h4 {
    font-size: 1.8rem;
  }
  p, div {
    font-size: 1.8rem;
    line-height: 1.3;
  }
  code {
    font-size: 1.2rem;
  }
  strong {
    font-weight: 700;
  }
  em {
    color: ${theme.red};
  }
  del {
    color: ${theme.pink};
  }
`;

export { GlobalStyle, GlobalStyle as default };
