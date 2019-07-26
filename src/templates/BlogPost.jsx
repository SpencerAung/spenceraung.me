import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'
import styled from 'styled-components'

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

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO />
      <StyledPost>
        <h1>{post.frontmatter.title}</h1>
        {/* eslint-disable-next-line */}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </StyledPost>
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
