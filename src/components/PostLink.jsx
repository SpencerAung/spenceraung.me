import React from 'react'
import { Link } from 'gatsby'
import { shape } from 'prop-types'
import styled from 'styled-components'
import { toKebabCase } from 'ramda-extension'

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
    margin-bottom: 0;
    color: ${(props) => props.theme.grey}
  }
`

const TagsWrapper = styled.article`
  a {
    display: inline-block;
    margin: 0 5px;
    padding: 0 5px;
    color: ${(props) => props.theme.grey};
    font-size: 1.8rem;
    font-weight: 400;
    font-family: 'Yrsa', 'georgia', sans-serif;
    line-height: normal;
    border: 1px solid ${(props) => props.theme.pink};
    border-radius: 2px;
  }

  a:hover {
    text-decoration: none;
    background-color: ${(props) => props.theme.pink};
    color: white;
  }
`

const PostLink = ({ post }) => {
  const { frontmatter, fields } = post

  return (
    <StyledPostLink>
      <p>{`${frontmatter.date}`}</p>
      <Link to={`${frontmatter.path}/${fields.slug}`}>{frontmatter.title}</Link>
      <TagsWrapper>
        {frontmatter.tags.map((tag) => (
          <Link key={tag} to={`/tags/${toKebabCase(tag)}`}>
            {tag}
          </Link>
        ))}
      </TagsWrapper>
    </StyledPostLink>
  )
}

PostLink.propTypes = {
  post: shape({}).isRequired
}

export default PostLink
