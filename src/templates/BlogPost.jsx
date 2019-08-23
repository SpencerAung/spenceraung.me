import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Tags from '../components/Tags'

const StyledPost = styled.article`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 100px;

  pre {
    margin-bottom: 3rem;
  }
`

const TitleSection = styled.section`
  margin-bottom: 5rem;

  h1 {
    margin-bottom: 2rem;
  }
`
const MMTextWrapper = styled.div`
  ${(props) =>
    props.lang === 'mm'
      ? `
        * {
          font-family: 'Padauk', sans-serif;
        }

        h1 {
          line-height: 5rem;
        }

        a,
        p,
        li {
          font-size: 1.8rem;
          line-height: 3rem;
        }
      `
      : ''}
`

const PostNav = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    display: block;
    max-width: 200px;
  }
`

const BlogPost = ({ data, pageContext }) => {
  const post = data.mdx
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        pathname={pageContext.url}
        lang={post.frontmatter.lang}
        image={post.frontmatter.image && post.frontmatter.image.publicURL}
        article
      />
      <StyledPost>
        <TitleSection>
          <p>{post.frontmatter.date}</p>
          <MMTextWrapper lang={post.frontmatter.lang}>
            <h1>{post.frontmatter.title}</h1>
          </MMTextWrapper>
          <Tags tags={post.frontmatter.tags} />
        </TitleSection>
        <MMTextWrapper lang={post.frontmatter.lang}>
          {/* eslint-disable-next-line */}
          {/* <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}
          <MDXRenderer>{post.body}</MDXRenderer>
        </MMTextWrapper>
      </StyledPost>
      <PostNav>
        {pageContext.previous.link ? (
          <MMTextWrapper lang={pageContext.previous.lang}>
            <Link to={pageContext.previous.link} style={{ textAlign: 'left' }}>
              <span role='img' aria-label='left arrow'>
                ⬅️
              </span>{' '}
              Previous
              <br />
              {pageContext.previous.title}
            </Link>
          </MMTextWrapper>
        ) : (
          <div />
        )}
        {pageContext.next.link ? (
          <MMTextWrapper lang={pageContext.next.lang}>
            <Link to={pageContext.next.link} style={{ textAlign: 'right' }}>
              Next{' '}
              <span role='img' aria-label='right arrow'>
                ➡️
              </span>
              <br />
              {pageContext.next.title}
            </Link>
          </MMTextWrapper>
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
    mdx(fields: { slug: { eq: $slug } }) {
      body
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
