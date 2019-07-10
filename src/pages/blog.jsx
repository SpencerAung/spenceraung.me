import React from 'react';
import { graphql } from 'gatsby';
import { shape } from 'prop-types';
import PostLink from '../components/PostLink';
import Layout from '../components/Layout';

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return <Layout>{Posts}</Layout>;
};

IndexPage.propTypes = {
  data: shape({}).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            path
            title
            cover {
              name
              publicURL
            }
          }
          timeToRead
          fields {
            slug
          }
        }
      }
    }
  }
`;