import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';

import SideMenu from './SideMenu';
import Footer from './Footer';
import { GlobalStyle } from './styles/GlobalStyles';
import { theme } from './styles/theme';

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 0 auto;
  max-width: 1440px;
  min-height: 100vh;
  height: 100%;
  padding: 0;
  background-color: ${(props) => props.theme.yellow};
`;

const SideMenuWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1;
  min-width: 250px;
  max-width: 250px;
`;

const ContentWrapper = styled.section`
  flex: 1;
  grid-column: 2/7;
  grid-row: 1;
  min-height: 100vh;
  padding: 5rem;
  background-color: ${(props) => props.theme.offWhite};
`;

const FooterWrapper = styled.div`
  grid-column: 1/7;
  grid-row: 2;
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
              <SideMenuWrapper>
                <SideMenu />
              </SideMenuWrapper>
              <ContentWrapper>
                <div>{children}</div>
              </ContentWrapper>
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
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
