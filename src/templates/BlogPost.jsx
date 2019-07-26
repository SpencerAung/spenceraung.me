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
  margin: 0 auto 80px;

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

  a {
    display: block;
    max-width: 200px;

    &:last-child {
      text-align: right;
    }
  }
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
        {pageContext.previous.link ? (
          <Link to={pageContext.previous.link}>
            <span role='img' aria-label='left arrow'>
              ⬅️
            </span>{' '}
            Previous
            <br />
            {pageContext.previous.title}
          </Link>
        ) : (
          <div />
        )}
        {pageContext.next.link ? (
          <Link to={pageContext.next.link}>
            Next{' '}
            <span role='img' aria-label='right arrow'>
              ➡️
            </span>
            <br />
            {pageContext.next.title}
          </Link>
        ) : (
          <div />
        )}
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
