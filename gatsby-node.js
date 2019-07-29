const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const R = require('ramda')
const R_ = require('ramda-extension')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
          edges {
            next {
              fields {
                slug
              }
              frontmatter {
                path
                title
                lang
              }
            }
            previous {
              fields {
                slug
              }
              frontmatter {
                path
                title
                lang
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
                tags
              }
            }
          }
        }
      }
    `)
      .then((result) => {
        const posts = result.data.allMarkdownRemark.edges

        posts.forEach(({ node, next, previous }) => {
          const { path: frontmatterPath } = node.frontmatter || {}
          const { fields } = node

          if (!fields) return

          const getUrl = (frontmatterPath, slug) =>
            frontmatterPath === '/blog' ? `/blog${slug}` : frontmatterPath

          const url = getUrl(frontmatterPath, node.fields.slug)

          const nextSlug =
            next && next.fields && next.frontmatter
              ? getUrl(next.frontmatter.path, next.fields.slug)
              : null
          const nextTitle =
            next && next.frontmatter ? next.frontmatter.title : ''

          const previousSlug =
            previous && previous.fields && previous.frontmatter
              ? getUrl(previous.frontmatter.path, previous.fields.slug)
              : null
          const previousTitle =
            previous && previous.frontmatter ? previous.frontmatter.title : ''

          if (url) {
            createPage({
              path: url,
              component: path.resolve(`./src/templates/BlogPost.jsx`),
              context: {
                slug: node.fields.slug,
                url: url,
                next: {
                  link: nextSlug,
                  title: nextTitle,
                  lang: next && next.frontmatter ? next.frontmatter.lang : ''
                },
                previous: {
                  link: previousSlug,
                  title: previousTitle,
                  lang:
                    previous && previous.frontmatter
                      ? previous.frontmatter.lang
                      : ''
                }
              }
            })
          }
        })

        let tags = []
        R.forEach((edge) => {
          if (R.path(['node', 'frontmatter', 'tags'])(edge)) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })(posts)

        tags = R.uniq(tags)
        tags.forEach((tag) => {
          createPage({
            path: `/tags/${R_.toKebabCase(tag)}/`,
            component: path.resolve(`./src/templates/Tags.jsx`),
            context: {
              tag
            }
          })
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
