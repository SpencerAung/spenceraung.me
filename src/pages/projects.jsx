import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import SEO from '../components/SEO'
import Layout from '../components/Layout'

const ProjectsPage = ({
  data: {
    allProjectsYaml: { edges }
  }
}) => {
  const projects = edges.map((edge) => (
    <div key={edge.node.id} style={{ marginBottom: '6rem' }}>
      <h3>{edge.node.name}</h3>
      <p>{edge.node.description}</p>
      <h4>Tech Used:</h4>
      <p>{edge.node.tech.join(', ')}</p>
      <h4>Contributions:</h4>
      <ul>
        {edge.node.contributions.map(contribution => <li>{contribution}</li>)}
      </ul>
    </div>
  ))

  return (
    <Layout>
      <SEO title='Projects' />
      {projects}
    </Layout>
  )
}

ProjectsPage.propTypes = {
  data: PropTypes.shape({}).isRequired
}

export default ProjectsPage

export const pageQuery = graphql`
  query {
    allProjectsYaml(sort: { order: DESC, fields: [startDate] }) {
      edges {
        node {
          id
          name
          company
          role
          startDate
          endDate
          tech
          contributions
          platforms
          description
          links {
            website
          }
        }
      }
    }
  }
`
