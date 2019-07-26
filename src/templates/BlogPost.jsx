import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const StyledPost = styled.article`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  p,
  li {
    font-size: 2rem;
  }
  pre {
    margin-bottom: 3rem;
  }
`

const PostNav = styled.article`
  display: flex;
  justify-content: space-between;
`

const BlogPost = ({ data, pageContext }) => {
  console.log('context', pageContext)
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO />
      <StyledPost>
        <h1>{post.frontmatter.title}</h1>
        {/* eslint-disable-next-line */}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </StyledPost>
      <PostNav>
        {pageContext.previous ? <Link to={pageContext.previous}>
          Previous
        </Link> : <div />}
        {pageContext.next ? <Link to={pageContext.next}>
          Next
        </Link> : <div />}
      </PostNav>
    </Layout>
  )
}

BlogPost.propTypes = {
  data: shape({}).isRequired
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
