import React, { useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: default;
  height: 100vh;
  min-height: 35em;
  overflow: hidden;
  position: relative;
  text-align: center;

  .inner {
    margin: 0 auto;
    max-width: 65%;

    @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
      max-width: 80%;
    }
  }

  h2 {
    transform: scale(${({ $loaded }) => ($loaded ? '1' : '0.95')});
    transition: transform 0.5s ease, opacity 0.5s ease;
    display: inline-block;
    font-size: 1.75em;
    opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
    padding: 0.35em 1em;
    position: relative;
    z-index: 1;

    &:before, &:after {
      transition: width 0.85s ease;
      transition-delay: 0.25s;
      background: ${({ theme }) => theme.colors.fgBold};
      content: '';
      display: block;
      height: 2px;
      position: absolute;
      width: ${({ $loaded }) => ($loaded ? '100%' : '0')};
    }

    &:before { top: 0; left: 0; }
    &:after { bottom: 0; right: 0; }
  }

  p {
    letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
    text-transform: uppercase;

    a { color: inherit; }
  }

  .more {
    transition: transform 0.75s ease, opacity 0.75s ease;
    transition-delay: 3.5s;
    transform: translateY(${({ $loaded }) => ($loaded ? '0' : '8.5em')});
    opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
    border: none;
    bottom: 0;
    color: inherit;
    font-size: 0.8em;
    height: 8.5em;
    left: 50%;
    letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
    margin-left: -8.5em;
    outline: 0;
    padding-left: ${({ theme }) => theme.size.letterSpacingAlt};
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    width: 16em;
    z-index: 1;

    &:after {
      background-image: url('/images/arrow.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      bottom: 4em;
      content: '';
      display: block;
      height: 1.5em;
      left: 50%;
      margin: 0 0 0 -0.75em;
      position: absolute;
      width: 1.5em;
    }
  }

  /* Fade-in overlay */
  &:after {
    pointer-events: none;
    transition: opacity ${({ theme }) => theme.duration.fadein} ease-in-out;
    transition-delay: 1.25s;
    content: '';
    background: ${({ theme }) => theme.colors.bg};
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: ${({ $loaded }) => ($loaded ? 0 : 1)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 7em 3em;
    height: auto;
    min-height: 0;

    h2 { font-size: 1.25em; }
    br { display: none; }
    .more { display: none; }
  }
`;

const SectionOne = styled.section`
  background-color: ${({ theme }) => theme.colors.accent1.bg};
  color: ${({ theme }) => theme.colors.accent1.fg};
  text-align: center;
  padding: 6em 0;

  strong, b, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.accent1.fgBold};
  }

  header p {
    color: ${({ theme }) => theme.colors.accent1.fgLight};
  }

  header.major p {
    color: ${({ theme }) => theme.colors.accent1.fg};
  }

  header.major h2 {
    border-color: ${({ theme }) => theme.colors.accent1.border};
  }

  .button {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.accent1.border};
    color: ${({ theme }) => theme.colors.accent1.fgBold};

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent1.borderBg};
    }
  }

  .inner {
    margin: 0 auto;
    max-width: 65em;
    padding: 0 2em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 4em 3em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 3em 2em;
  }
`;

const SectionTwo = styled.section`
  .spotlight {
    align-items: center;
    display: flex;

    .image {
      order: 1;
      border-radius: 0;
      width: 40%;

      img {
        border-radius: 0;
        width: 100%;
        display: block;
      }
    }

    .content {
      padding: 2em 4em;
      order: 2;
      max-width: 48em;
      width: 60%;
    }

    &:nth-child(2n) {
      flex-direction: row-reverse;
    }

    &:nth-child(1) { background-color: rgba(0,0,0, 0.075); }
    &:nth-child(2) { background-color: rgba(0,0,0, 0.15); }
    &:nth-child(3) { background-color: rgba(0,0,0, 0.225); }
    &:nth-child(4) { background-color: rgba(0,0,0, 0.3); }
    &:nth-child(5) { background-color: rgba(0,0,0, 0.375); }

    @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
      .image { width: 45%; }
      .content { width: 55%; }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
      display: block;

      br { display: none; }
      .image { width: 100%; }

      .content {
        padding: 4em 3em;
        max-width: none;
        text-align: center;
        width: 100%;
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
      .content { padding: 3em 2em; }
    }
  }
`;

const spotlights = [
  {
    image: '/images/me_tinker.jpg',
    title: 'Tinkerer',
    content: 'I do try to try tonnes of funny ideas.',
    link: '/projects/',
    linkText: 'Projects',
  },
  {
    image: '/images/me_emily.jpg',
    title: 'Artist',
    content:
      'You can taste my cooking on invitation, you may not want to hear my music, but you are welcome to read my writing.',
    link: '/blog/',
    linkText: 'Blog',
  },
  {
    image: '/images/me_server.jpg',
    title: 'Doc',
    content:
      'That is a strange way to say that I am good at problem solving, not the medical kind though.',
  },
  {
    image: '/images/me_beach.jpg',
    title: 'Beach Boi',
    content:
      'There are two kinds of people: those who love the mountains and those who love the beaches.',
  },
  {
    image: '/images/me_moselle.jpg',
    title: 'Explorer',
    content:
      'You should take the road less travelled because the influencers will tell you about the other ones anyway.',
  },
];

const IndexPage = ({ data }) => {
  const { title, descriptionSmall } = data.site.siteMetadata;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after mount
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout isLanding>
      <SEO title="Home" />

      <Banner id="banner" $loaded={loaded}>
        <div className="inner">
          <h2>{title}</h2>
          <p>{descriptionSmall}</p>
        </div>
        <a href="#one" className="more scrolly">
          Learn More
        </a>
      </Banner>

      <SectionOne id="one" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>To the first order of approximation</h2>
            <p>
              I have an undergraduate degree in physics with a minor in computer
              science. Since then, I have spent a few years using these skills to
              build data science pipelines for financial trading. And then there
              are higher order residuals of myself...
            </p>
            <p>
              <a href="mailto:cheekujodhpur@gmail.com" className="button fit">
                Hello Ayush!
              </a>
            </p>
          </header>
        </div>
      </SectionOne>

      <SectionTwo id="two" className="wrapper alt style2">
        {spotlights.map((spot, i) => (
          <section className="spotlight" key={i}>
            <div className="image">
              <img src={spot.image} alt="" />
            </div>
            <div className="content">
              <h2>{spot.title}</h2>
              <p>{spot.content}</p>
              {spot.link && (
                <p>
                  <Link to={spot.link} className="button special">
                    {spot.linkText}
                  </Link>
                </p>
              )}
            </div>
          </section>
        ))}
      </SectionTwo>
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        descriptionSmall
      }
    }
  }
`;

export default IndexPage;
