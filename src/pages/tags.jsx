import React from 'react'
import PropTypes from 'prop-types'
import { toKebabCase } from 'ramda-extension'
import SEO from '../components/SEO'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

const TagsPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title }
    }
  }
}) => (
  <Layout>
    <SEO title={title} />
    <section>
      <h1>Tags</h1>
      <ul>
        {group.map((tag) => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${toKebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired
        }).isRequired
      )
    })
  }),
  site: PropTypes.shape({
    siteMetadata: PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  })
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx {
      group(field: frontmatter___tags) {
        totalCount
        fieldValue
      }
    }
  }
`
