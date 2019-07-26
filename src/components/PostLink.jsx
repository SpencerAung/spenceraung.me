import React from 'react'
import { Link } from 'gatsby'
import { shape } from 'prop-types'
import styled from 'styled-components'

const StyledPostLink = styled.div`
  margin-bottom: 4rem;
  width: 100%;

  a {
    position: relative;
    display: inline-block;
    margin-bottom: 1.38rem;
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Exo', sans-serif;
  }

  a:hover::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    /* border-bottom: 2px solid ${({ theme }) => theme.blue}; */
  }

  p {
    font-size: 1.8rem;
  }
`

const PostLink = ({ post }) => {
  const { frontmatter, fields, timeToRead, excerpt } = post

  return (
    <StyledPostLink>
      <Link to={`${frontmatter.path}/${fields.slug}`}>{frontmatter.title}</Link>
      <p>{excerpt}</p>
      <p>{`${frontmatter.date}. ${timeToRead} min`}</p>
    </StyledPostLink>
  )
}

PostLink.propTypes = {
  post: shape({}).isRequired
}

export default PostLink
