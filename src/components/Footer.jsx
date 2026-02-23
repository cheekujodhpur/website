import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 6em 0;
  background-color: #1e2830;
  text-align: center;

  .icons {
    font-size: 1.25em;

    a {
      color: ${({ theme }) => theme.colors.fgLight};

      &:hover {
        color: ${({ theme }) => theme.colors.fg};
      }
    }
  }

  .copyright {
    color: ${({ theme }) => theme.colors.fgLight};
    font-size: 0.8em;
    letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
    list-style: none;
    padding: 0;
    text-transform: uppercase;

    li {
      border-left: solid 1px ${({ theme }) => theme.colors.fgLight};
      display: inline-block;
      line-height: 1em;
      margin-left: 1em;
      padding-left: 1em;

      &:first-child {
        border-left: 0;
        margin-left: 0;
        padding-left: 0;
      }

      a {
        color: inherit;

        &:hover {
          color: ${({ theme }) => theme.colors.fg};
        }
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.xsmall}) {
        border: 0;
        display: block;
        line-height: 1.65em;
        margin: 0;
        padding: 0.5em 0;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 4em 3em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 3em 2em;
  }
`;

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          social {
            name
            icon
            url
          }
        }
      }
    }
  `);

  const { social, title } = data.site.siteMetadata;
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter id="footer">
      <ul className="icons">
        {social.map(({ name, icon, url }) => (
          <li key={name}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={url}
              className={`icon ${icon}`}
            >
              <span className="label">{name}</span>
            </a>
          </li>
        ))}
      </ul>
      <ul className="copyright">
        <li>&copy; {currentYear} {title}</li>
        <li>
          Design: <a href="http://html5up.net" target="_blank" rel="noopener noreferrer">HTML5 UP</a>
        </li>
        <li>
          Built with: <a href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer">Gatsby</a>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
