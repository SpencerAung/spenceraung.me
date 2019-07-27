import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
        defaultLang: lang
      }
    }
  }
`

const SEO = ({ title, description, image, pathname, article, lang }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage,
          twitterUsername,
          defaultLang
        }
      }
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || '/'}`,
        lang: lang || defaultLang
      }

      return (
        <>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <html lang={seo.lang} />
            <meta name='description' content={seo.description} />
            <meta name='image' content={seo.image} />
            {seo.url && <meta property='og:url' content={seo.url} />}
            {(article ? true : null) && (
              <meta property='og:true' content='article' />
            )}
            {seo.title && <meta property='og:title' content={seo.title} />}
            {seo.description && (
              <meta property='og:description' content={seo.description} />
            )}
            {seo.image && <meta property='og:image' content={seo.image} />}
            <meta name='twitter:card' content='summary_large_image' />
            {twitterUsername && (
              <meta name='twitter:creator' content={twitterUsername} />
            )}
            {seo.title && <meta property='twitter:title' content={seo.title} />}
            {seo.description && (
              <meta property='twitter:description' content={seo.description} />
            )}
            {seo.image && <meta property='twitter:image' content={seo.image} />}

            {/* Google site verification code */}
            <meta
              name='google-site-verification'
              content='ynIPLdyMhXN1Hlg7D_We_cQhITMapAvOyR2JdYnyNSo'
            />
          </Helmet>
        </>
      )
    }}
  />
)

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false
}

export default SEO
