const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            next {
              fields {
                slug
              }
              frontmatter {
                path
              }
            }
            previous {
              fields {
                slug
              }
              frontmatter {
                path
              }
            }
            node {
              fields {
                slug
              }
              frontmatter {
                path
                date
                title
              }
            }
          }
        }
      }
    `)
      .then((result) => {
        result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
          const { path: frontmatterPath } = node.frontmatter || {}
          const { fields } = node

          if (!fields) return

          const getUrl = (frontmatterPath, slug) => frontmatterPath === '/blog' ? `/blog${slug}` : frontmatterPath

          const url = getUrl(frontmatterPath, node.fields.slug)
          // frontmatterPath === '/blog'
          //   ? `/blog${node.fields.slug}`
          //   : frontmatterPath

          const nextSlug = next && next.fields && next.frontmatter ? getUrl(next.frontmatter.path, next.fields.slug) : null

          const previousSlug = previous && previous.fields && previous.frontmatter ? getUrl(previous.frontmatter.path, previous.fields.slug) : null

          if (url) {
            createPage({
              path: url,
              component: path.resolve(`./src/templates/BlogPost.jsx`),
              context: {
                slug: node.fields.slug,
                next: nextSlug,
                previous: previousSlug
              }
            })
          }
        })
        resolve()
      })
      .catch((e) => {
        console.log(e.message)
      })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const fileName = createFilePath({ node, getNode, basePath: 'src/blog' })
    const [date, slug] = fileName.split('---')

    if (slug) {
      createNodeField({
        node,
        name: `slug`,
        value: `${date}-${slug}`
      })
    }
  }
}
