import React from 'react';
import { Link } from 'gatsby';
import { shape } from 'prop-types';

const PostLink = ({ post }) => (
  <div>
    {console.log({ post })}
    <Link to={`${post.frontmatter.path}${post.fields.slug}`}>
      {`${post.frontmatter.title} (${post.frontmatter.date})`}
    </Link>
  </div>
);

PostLink.propTypes = {
  post: shape({}).isRequired,
};

export default PostLink;
