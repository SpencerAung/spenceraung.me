const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
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
                title
              }
            }
            previous {
              fields {
                slug
              }
              frontmatter {
                path
                title
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
        result.data.allMarkdownRemark.edges.forEach(
          ({ node, next, previous }) => {
            const { path: frontmatterPath } = node.frontmatter || {};
            const { fields } = node;

            if (!fields) return;

            const getUrl = (frontmatterPath, slug) =>
              frontmatterPath === '/blog' ? `/blog${slug}` : frontmatterPath;

            const url = getUrl(frontmatterPath, node.fields.slug);

            const nextSlug =
              next && next.fields && next.frontmatter
                ? getUrl(next.frontmatter.path, next.fields.slug)
                : null;
            const nextTitle =
              next && next.frontmatter ? next.frontmatter.title : '';

            const previousSlug =
              previous && previous.fields && previous.frontmatter
                ? getUrl(previous.frontmatter.path, previous.fields.slug)
                : null;
            const previousTitle =
              previous && previous.frontmatter
                ? previous.frontmatter.title
                : '';

            if (url) {
              createPage({
                path: url,
                component: path.resolve(`./src/templates/BlogPost.jsx`),
                context: {
                  slug: node.fields.slug,
                  next: {
                    link: nextSlug,
                    title: nextTitle,
                  },
                  previous: {
                    link: previousSlug,
                    title: previousTitle,
                  },
                },
              });
            }
          }
        );
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
