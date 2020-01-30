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
    line-height: 2;
  }
  a {
    color: ${theme.colors.link};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: ${theme.colors.link};
      text-decoration: underline;
    }
  }
  h1 {
    font-size: 3rem;
    line-height: 4rem;
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
    color: ${theme.colors.darkBlue};
  }
  p, div, li {
    font-size: 2rem;
    line-height: 1.35;
		color: ${theme.colors.paragraph};
  }
  p,
  blockquote {
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
    color: ${theme.colors.red};
  }
  del {
    color: ${theme.colors.pink};
  }
`

export { GlobalStyle, GlobalStyle as default }
