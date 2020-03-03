import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  margin: 4rem 0;
  border: 2px solid ${props => props.theme.red};
  background-color: ${props => props.theme.white};
  padding: 2rem;

  h3 {
    margin: 0;
    font-weight: 700;
  }

  a {
    font-weight: 700;
  }

  p {
    margin: 0;
  }
`

export default () => (
  <Card>
    <h3>Hey! 👉<a href='https://coronavirus-info.now.sh' target='_blank'>Check out my latest project</a>👈</h3>
    <p><small>I made a web app that shows the latest COVID-19 virus infection status.</small></p>
  </Card>
)
