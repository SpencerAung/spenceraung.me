import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import SEO from '../components/SEO'
import Layout from '../components/Layout'

function renderProjects (projects = []) {
  return projects.map((node) => (
    <div key={node.id} style={{ marginBottom: '6rem' }}>
      <h3>{node.name}</h3>
      <p>{node.description}</p>
      <h4>Tech Used:</h4>
      <p>{node.tech.join(', ')}</p>
      <h4>Contributions:</h4>
      <ul>
        {node.contributions.map(contribution => <li key={contribution}>{contribution}</li>)}
      </ul>
    </div>
  ))
}

function renderTags (tags = [], activeTags = []) {
  return tags.map(tag => <span key={tag} className={activeTags.includes(tag) ? 'active' : ''}>{tag}</span>)
}

const ProjectsPage = ({
  data: {
    allProjectsYaml: { edges }
  }
}) => {
  const projects = edges
    .map((edge) => ({
      ...edge.node,
      tags: [
        edge.node.company,
        edge.node.lab,
        ...edge.node.tech,
        ...edge.node.platforms
      ]
    }))

  const tags = [...new Set(projects.reduce((acc, { tags }) => {
    return [...acc, ...tags]
  }, []))].sort()

  return (
    <Layout>
      <SEO title='Projects' />
      <h1>Projects</h1>
      {renderTags(tags)}
      {renderProjects(projects)}
    </Layout>
  )
}

ProjectsPage.propTypes = {
  data: PropTypes.shape({}).isRequired
}

export default ProjectsPage

export const pageQuery = graphql`
  query {
    allProjectsYaml(
      sort: { order: DESC, fields: [startDate] },
      filter: { isArchived: { ne: true }}
    ) {
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
          lab
        }
      }
    }
  }
`
