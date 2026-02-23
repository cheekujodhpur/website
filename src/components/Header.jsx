import React, { useState, useCallback, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledHeader = styled.header`
  transition: background-color ${({ theme }) => theme.duration.transitions} ease;
  background: ${({ theme }) => theme.colors.bg};
  height: 3em;
  left: 0;
  line-height: 3em;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.misc.zIndexBase};

  h1 {
    transition: opacity ${({ theme }) => theme.duration.transitions} ease;
    height: inherit;
    left: 1.25em;
    line-height: inherit;
    position: absolute;
    top: 0;

    a {
      border: 0;
      display: block;
      height: inherit;
      line-height: inherit;

      @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
        font-size: 0.8em;
      }
    }
  }

  nav {
    height: inherit;
    line-height: inherit;
    position: absolute;
    right: 0.75em;
    top: 0;

    > ul {
      list-style: none;
      margin: 0;
      padding: 0;
      white-space: nowrap;

      > li {
        display: inline-block;
        padding: 0;
      }
    }
  }

  .menuToggle {
    text-decoration: none;
    display: inline-block;
    width: 2em;
    height: 3em;
    border: 0;
    position: relative;

    &:after {
      background-image: url('/images/bars.svg');
      background-position: right center;
      background-repeat: no-repeat;
      content: '';
      display: inline-block;
      height: 3.75em;
      vertical-align: top;
      width: 2em;
    }

    span {
      display: none;
    }
  }

  &.alt {
    background: transparent;
    position: fixed;

    h1 {
      top: 2em;
      left: 2.5em;
    }

    nav {
      top: 2em;
      right: 3.25em;
    }
  }
`;

const Menu = styled.div`
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(20em)')};
  transition: transform ${({ theme }) => theme.duration.menu} ease;
  -webkit-overflow-scrolling: touch;
  background: ${({ theme }) => theme.colors.accent1.bg};
  color: ${({ theme }) => theme.colors.accent1.fgBold};
  height: 100%;
  max-width: 80%;
  overflow-y: auto;
  padding: 3em 2em;
  position: fixed;
  right: 0;
  top: 0;
  width: 20em;
  z-index: ${({ theme }) => theme.misc.zIndexBase + 2};

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
      border-top: solid 1px ${({ theme }) => theme.colors.accent1.border};
      margin: 0.5em 0 0 0;
      padding: 0.5em 0 0 0;

      &:first-child {
        border-top: 0 !important;
        margin-top: 0 !important;
        padding-top: 0 !important;
      }

      > a {
        border: 0;
        color: inherit;
        display: block;
        font-size: 0.8em;
        letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
        outline: 0;
        text-decoration: none;
        text-transform: uppercase;

        @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
          line-height: 3em;
        }
      }
    }
  }
`;

const CloseButton = styled.button`
  background-image: url('/css/images/close.svg');
  background-position: 4.85em 1em;
  background-repeat: no-repeat;
  border: 0;
  cursor: pointer;
  display: block;
  height: 3em;
  position: absolute;
  right: 0;
  top: 0;
  vertical-align: middle;
  width: 7em;
  background-color: transparent;
`;

const Overlay = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ theme }) => theme.misc.zIndexBase + 1};
`;

const Header = ({ isLanding }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const toggleMenu = useCallback((e) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeMenu]);

  return (
    <>
      <StyledHeader id="header" className={isLanding ? 'alt' : ''}>
        <h1>
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </h1>
        <nav id="nav">
          <ul>
            <li className="special">
              <a href="#menu" className="menuToggle" onClick={toggleMenu}>
                <span>Menu</span>
              </a>
            </li>
          </ul>
        </nav>
      </StyledHeader>

      <Overlay $isOpen={menuOpen} onClick={closeMenu} />
      <Menu id="menu" $isOpen={menuOpen}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/blog/" onClick={closeMenu}>Blog</Link></li>
          <li><Link to="/projects/" onClick={closeMenu}>Projects</Link></li>
          <li>
            <a href="/feed.xml" className="icon fa-feed" onClick={closeMenu}>
              {' '}RSS Feed
            </a>
          </li>
        </ul>
        <CloseButton onClick={closeMenu} />
      </Menu>
    </>
  );
};

export default Header;
