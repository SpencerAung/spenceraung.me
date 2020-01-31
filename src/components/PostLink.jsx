import React from 'react'
import { Link } from 'gatsby'
import { shape } from 'prop-types'
import styled from 'styled-components'

import Tags from './Tags'

const StyledPostLink = styled.div`
  margin-bottom: 4rem;
  width: 100%;

  p {
    font-size: 1.6rem;
    margin-bottom: 0;
    color: ${(props) => props.theme.colors.paragraph};
  }
`

const TitleLink = styled(Link)`
  position: relative;
  display: inline-block;
  margin-bottom: 1.38rem;
  font-size: 2.5rem;
  ${(props) =>
    props.lang === 'mm'
      ? `
    font-family: 'Padauk', sans-serif;
  `
      : ``}

  &:hover::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    /* border-bottom: 2px solid ${({ theme }) => theme.blue}; */
  }
`

const PostLink = ({ post }) => {
  const { frontmatter, fields } = post

  return (
    <StyledPostLink>
      <p>{`${frontmatter.date}`}</p>
      <TitleLink
        to={`${frontmatter.path}/${fields.slug}`}
        lang={frontmatter.lang}
      >
        {frontmatter.title}
      </TitleLink>
      <Tags tags={frontmatter.tags} />
    </StyledPostLink>
  )
}

PostLink.propTypes = {
  post: shape({}).isRequired
}

export default PostLink
