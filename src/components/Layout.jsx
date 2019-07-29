import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/GlobalStyles'
import { theme } from './styles/theme'
import Menu from './Menu'

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 0;
  /* background-color: ${(props) => props.theme.lightYellow}; */
  background-color: #fff;
`

const ContentWrapper = styled.section`
  margin: 0 auto;
  max-width: 800px;
  min-height: 800px;
  padding: 3rem;
  /* background-color: ${(props) => props.theme.lightYellow}; */
  background-color: #fff;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyle />
            <PageWrapper>
              <Menu />
              <ContentWrapper>
                <div>{children}</div>
              </ContentWrapper>
            </PageWrapper>
          </Fragment>
        </ThemeProvider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
