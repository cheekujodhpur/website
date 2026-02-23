import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const MainHeader = styled.header`
  padding: 12em 0;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                    url('/images/projects_banner.jpg');
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

const ProjectsPage = ({ data }) => {
  const projects = data.allMarkdownRemark.nodes;

  // Split into two columns using modulo logic (same as Jekyll)
  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 === 1);

  const ProjectCard = ({ project }) => (
    <header>
      <h5>
        <Link to={project.fields.slug}>{project.frontmatter.title}</Link>
      </h5>
      <p>
        <i>{project.frontmatter.formattedDate}</i> -{' '}
        {project.frontmatter.subtitle}
      </p>
    </header>
  );

  return (
    <Layout>
      <SEO title="Projects" pathname="/projects/" />
      <article id="main">
        <MainHeader>
          <h2>Projects</h2>
          <p>Built with love.</p>
        </MainHeader>

        <ContentWrapper className="wrapper style5">
          <div className="inner">
            <section>
              <Grid className="row">
                <div>
                  {leftColumn.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
                <div>
                  {rightColumn.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </Grid>
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
      filter: { fields: { collection: { eq: "projects" } } }
      sort: { frontmatter: { weight: DESC } }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          subtitle
          formattedDate: date(formatString: "MMMM YYYY")
          weight
        }
      }
    }
  }
`;

export default ProjectsPage;
