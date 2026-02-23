import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const NotFoundWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.accent7.bg};
  color: ${({ theme }) => theme.colors.accent7.fg};
  padding: 8em 0;
  text-align: center;

  h2, h3 {
    color: ${({ theme }) => theme.colors.accent7.fgBold};
  }

  .inner {
    margin: 0 auto;
    max-width: 65em;
    padding: 0 2em;
  }
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not Found" />
    <NotFoundWrapper className="wrapper style5">
      <div className="inner">
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
      </div>
    </NotFoundWrapper>
  </Layout>
);

export default NotFoundPage;
