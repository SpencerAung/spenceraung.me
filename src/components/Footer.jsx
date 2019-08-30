import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  margin-top: 2rem;
  padding: 2rem;
  text-align: center;

  p {
    font-size: 1.5rem;
  }
`

const Footer = () => (
  <StyledFooter>
    <p>
      <span role='img' aria-label='heart'>
        🤖❤️😼
      </span>
    </p>
  </StyledFooter>
)

export default Footer
