import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const MainHeader = styled.header`
  padding: 12em 0;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                    url('/images/blog_banner2.jpg');
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;

  h2 {
    font-size: 1.75em;
    margin: 0 0 0.5em 0;
  }

  p {
    color: inherit;
    letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
    text-transform: uppercase;
    top: 0;

    a { color: inherit; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xlarge}) {
    padding: 10em 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
    padding: 8em 3em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 10em 3em;
    background-attachment: scroll;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 5em 3em;

    h2 {
      font-size: 1.25em;
      margin: 0 0 1em 0;
    }
  }
`;

const ContentWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.accent7.bg};
  color: ${({ theme }) => theme.colors.accent7.fg};
  padding: 4em 0;

  strong, b, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.accent7.fgBold};
  }

  header p {
    color: ${({ theme }) => theme.colors.accent7.fgLight};
  }

  a {
    color: ${({ theme }) => theme.colors.accent7.fgBold};
  }

  .inner {
    margin: 0 auto;
    max-width: 65em;
    padding: 0 2em;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 -1.5em;
  width: calc(100% + 1.5em);

  > * {
    box-sizing: border-box;
    padding: 0 0 0 1.5em;
    width: 50%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    > * {
      width: 100%;
    }
  }
`;

const PostGrid = ({ posts }) => (
  <Grid className="row">
    {posts.map((post) => {
      const url = post.frontmatter.exturl || post.fields.slug;
      const isExternal = !!post.frontmatter.exturl;

      return (
        <div key={post.id}>
          <header>
            <h5>
              {isExternal ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {post.frontmatter.title}
                </a>
              ) : (
                <Link to={url}>{post.frontmatter.title}</Link>
              )}
            </h5>
            <p>
              <i>{post.frontmatter.formattedDate}</i> -{' '}
              {post.frontmatter.categories &&
                post.frontmatter.categories.join(', ')}
            </p>
          </header>
        </div>
      );
    })}
  </Grid>
);

const BlogPage = ({ data }) => {
  const allPosts = data.allMarkdownRemark.nodes;
  const collections = allPosts.filter((p) => p.frontmatter.collection);
  const periodicals = allPosts.filter((p) => !p.frontmatter.collection);

  return (
    <Layout>
      <SEO title="Blog" pathname="/blog/" />
      <article id="main">
        <MainHeader>
          <h2>Blog</h2>
          <p>Heart poured out</p>
        </MainHeader>

        <ContentWrapper className="wrapper style5">
          <div className="inner">
            {collections.length > 0 && (
              <section>
                <h3>Collections</h3>
                <PostGrid posts={collections} />
              </section>
            )}
            <section>
              <h3>Periodicals</h3>
              <PostGrid posts={periodicals} />
            </section>
          </div>
        </ContentWrapper>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          formattedDate: date(formatString: "MMMM YYYY")
          categories
          exturl
          collection
        }
      }
    }
  }
`;

export default BlogPage;
