import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';

import Sidebar from './Sidebar';
import Footer from './Footer';
import { GlobalStyle } from './styles/GlobalStyles';
import { theme } from './styles/theme';

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  min-height: 100vh;
  height: 100%;
  padding: 0;
  background-color: ${(props) => props.theme.yellow};
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ContentWrapper = styled.section`
  flex: 1;
  min-height: 100vh;
  padding: 5rem;
  background-color: ${(props) => props.theme.offWhite};
`;

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
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyle />
            <PageWrapper>
              <Flex>
                <Sidebar />
                <ContentWrapper>
                  <div>{children}</div>
                </ContentWrapper>
              </Flex>
              <Footer />
            </PageWrapper>
          </Fragment>
        </ThemeProvider>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
