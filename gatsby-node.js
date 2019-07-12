const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
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
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const { path: frontmatterPath } = node.frontmatter || {};
          const { fields } = node;

          if (!fields) return;

          const url =
            frontmatterPath === '/blog'
              ? `/blog${node.fields.slug}`
              : frontmatterPath;

          if (url) {
            createPage({
              path: url,
              component: path.resolve(`./src/templates/BlogPost.jsx`),
              context: {
                slug: node.fields.slug,
              },
            });
          }
        });
        resolve();
      })
      .catch((e) => {
        console.log(e.message);
      });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const fileName = createFilePath({ node, getNode, basePath: 'src/blog' });
    const [date, slug] = fileName.split('---');

    if (slug) {
      createNodeField({
        node,
        name: `slug`,
        value: `${date}-${slug}`,
      });
    }
  }
};
