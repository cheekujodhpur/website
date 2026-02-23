module.exports = {
  siteMetadata: {
    title: 'Kumar Ayush',
    description:
      'background in physics, works in finance as a quant. likes to read history and poltics. blogs, plays violin not bad but not very good. fun guy, turns dreams into reality.',
    descriptionSmall: 'turns dreams into reality.',
    siteUrl: 'https://kumar-ayush.com',
    email: 'cheekujodhpur@gmail.com',
    social: [
      { name: 'github', icon: 'fa-github', url: 'https://github.com/cheekujodhpur' },
      { name: 'linkedin', icon: 'fa-linkedin-square', url: 'https://linkedin.com/in/cheekujodhpur' },
      { name: 'twitter', icon: 'fa-twitter', url: 'https://twitter.com/kumarayush4ever' },
      { name: 'facebook', icon: 'fa-facebook-official', url: 'https://facebook.com/cheekujodhpur' },
    ],
  },

  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'projects',
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        gfm: true,
        footnotes: true,
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => ({
                title: node.frontmatter.title,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }],
              }));
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fields: { collection: { eq: "blog" } } }
                  sort: { frontmatter: { date: DESC } }
                  limit: 10
                ) {
                  nodes {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/feed.xml',
            title: "Kumar Ayush' Blog",
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
  ],
};
