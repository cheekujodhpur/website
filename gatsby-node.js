const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemarkFrontmatter {
      show_on_web: Boolean
      send_email: Boolean
    }
  `);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const collection = fileNode.sourceInstanceName;

    let slug = createFilePath({ node, getNode, basePath: `content/${collection}` });

    // Remove date prefix for blog posts (e.g., /2021-12-25-title/ → /title/)
    if (collection === 'blog') {
      slug = slug.replace(/\/\d{4}-\d{2}-\d{2}-/, '/');
    }

    // Prefix with collection
    const fullSlug = `/${collection}${slug}`;

    createNodeField({
      node,
      name: 'slug',
      value: fullSlug,
    });

    createNodeField({
      node,
      name: 'collection',
      value: collection,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
            collection
          }
          frontmatter {
            show_on_web
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMarkdownRemark.nodes.forEach((node) => {
    if (node.frontmatter.show_on_web === false) return;

    const template =
      node.fields.collection === 'blog'
        ? './src/templates/blog-post.jsx'
        : './src/templates/project-post.jsx';

    createPage({
      path: node.fields.slug,
      component: path.resolve(template),
      context: {
        id: node.id,
        slug: node.fields.slug,
      },
    });
  });
};
