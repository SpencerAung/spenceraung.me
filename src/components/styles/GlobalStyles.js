import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'
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
    color: ${theme.darkBlue};
    text-decoration: none;
    font-weight: 500;
    font-size: 2.2rem;

    &:hover {
      color: ${theme.darkBlue};
      text-decoration: underline;
    }
  }
  h1 {
    font-size: 3rem;
    margin-bottom: 5rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-size: 1.8rem;
  }
  h2, h3, h4 {
    margin: 3rem 0;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${theme.darkerBlue};
  }
  p, div, li {
    font-size: 2rem;
    line-height: 1.48;
  }
  p {
    margin-bottom: 3rem;
  }
  code,
  code[class*="language-"],
  pre[class*="language-"] {
    font-size: 1.3rem;
  }
  :not(pre) > code[class*="language-"] {
    padding: 3px 8px;
    background-color: ${theme.washedWhite};
  }
  pre {
    border-radius: 10px;
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
`

export { GlobalStyle, GlobalStyle as default }
