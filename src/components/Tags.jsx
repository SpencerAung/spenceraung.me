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
    color: ${(props) => props.theme.colors.white};
    font-size: 1.8rem;
    font-weight: 400;
    line-height: normal;
		background-color: ${(props) => props.theme.colors.pink};
    border-radius: 2px;
  }

  a:hover {
    text-decoration: none;
		color: ${(props) => props.theme.colors.paragraph};
		border: 1px solid ${(props) => props.theme.colors.pink};
		background-color: transparent;
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
