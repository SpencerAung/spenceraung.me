import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'
import PostLink from '../components/PostLink'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title='Blog' />
      {Posts}
    </Layout>
  )
}

IndexPage.propTypes = {
  data: shape({}).isRequired
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            path
            title
            tags
            lang
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
