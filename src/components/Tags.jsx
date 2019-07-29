import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { toKebabCase } from 'ramda-extension'
import { Link } from 'gatsby'

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
const Tags = ({ tags }) => (
  <TagsWrapper>
    {tags.map((tag) => (
      <Link key={tag} to={`/tags/${toKebabCase(tag)}`}>
        {tag}
      </Link>
    ))}
  </TagsWrapper>
)

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
}

Tags.defaultProps = {
  tags: []
}

export default Tags
