import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const PageWrapper = styled.div`
  transition: opacity ${({ theme }) => theme.duration.menu} ease;
  opacity: 1;
  padding-top: ${({ $isLanding }) => ($isLanding ? '0' : '3em')};

  ${({ $isLanding }) =>
    $isLanding &&
    `
    background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                      url('/images/banner2.jpg');
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

const Layout = ({ children, isLanding = false }) => {
  useEffect(() => {
    // External link handler (from scripts.html)
    const handleLinks = () => {
      const host = window.location.hostname;
      document.querySelectorAll('a').forEach((link) => {
        if (link.hostname !== host && link.hostname !== '') {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      });
    };

    handleLinks();

    // Re-run when content updates
    const observer = new MutationObserver(handleLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <PageWrapper id="page-wrapper" $isLanding={isLanding}>
      <Header isLanding={isLanding} />
      {children}
      <Footer />
    </PageWrapper>
  );
};

export default Layout;
