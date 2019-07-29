import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Tags from '../components/Tags'

const StyledPost = styled.article`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 80px;

  pre {
    margin-bottom: 3rem;
  }

  ${(props) =>
    props.lang === 'mm'
      ? `
  p,
  li {
    font-size: 1.8rem;
    line-height: 2.8rem;
  }
  `
      : ''}
`

const TitleSection = styled.section`
  margin-bottom: 5rem;

  h1 {
    margin-bottom: 2rem;
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
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        pathname={pageContext.url}
        lang={post.frontmatter.lang}
        image={post.frontmatter.image && post.frontmatter.image.publicURL}
        article
      />
      <StyledPost lang={post.frontmatter.lang}>
        <TitleSection>
          <p>{post.frontmatter.date}</p>
          <h1>{post.frontmatter.title}</h1>
          <Tags tags={post.frontmatter.tags} />
        </TitleSection>
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
      timeToRead
      frontmatter {
        date(formatString: "MMM DD, YYYY")
        title
        lang
        image {
          publicURL
        }
        tags
      }
    }
  }
`
