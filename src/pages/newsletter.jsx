import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SubscribeForm from '../components/SubscribeForm';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.accent7.bg};
  color: ${({ theme }) => theme.colors.accent7.fg};
  min-height: 60vh;
  display: flex;
  align-items: center;

  .inner {
    margin: 0 auto;
    max-width: 38em;
    padding: 4em 2em;
    text-align: center;
  }

  h2 {
    color: ${({ theme }) => theme.colors.accent7.fgBold};
    font-size: 1.75em;
    margin: 0 0 0.5em;
  }

  p {
    margin: 0 0 1.5em;
    line-height: 1.75;
  }

  a {
    color: ${({ theme }) => theme.colors.accent1.bg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    h2 {
      font-size: 1.25em;
    }

    .inner {
      padding: 3em 2em;
    }
  }
`;

const STATES = {
  'subscribed-true': {
    heading: "You're subscribed",
    body: "Your email is confirmed. You'll receive new posts as they're published.",
    showResubscribe: false,
  },
  'subscribed-already': {
    heading: 'Already subscribed',
    body: "This address is already on the list. You'll hear from me when the next post goes out.",
    showResubscribe: false,
  },
  'unsubscribed-true': {
    heading: "You've unsubscribed",
    body: "Done. Changed your mind? You can resubscribe below.",
    showResubscribe: true,
  },
  default: {
    heading: 'Newsletter',
    body: null,
    showResubscribe: true,
  },
};

const NewsletterPage = ({ location, data }) => {
  const email = data.site.siteMetadata.email;
  const params = new URLSearchParams(location?.search || '');
  const key = params.get('subscribed')
    ? `subscribed-${params.get('subscribed')}`
    : params.get('unsubscribed')
    ? `unsubscribed-${params.get('unsubscribed')}`
    : 'default';

  const { heading, body, showResubscribe } = STATES[key] || STATES.default;

  const bodyContent = body ?? (
    <>
      The idea is to publish short form content every week, and long form content
      as it is ready. For any issues, please{' '}
      <a href={`mailto:${email}`}>email me</a>.
    </>
  );

  return (
    <Layout>
      <SEO title={heading} />
      <Wrapper>
        <div className="inner">
          <h2>{heading}</h2>
          <p>{bodyContent}</p>
          <Link to="/blog/">Read the blog →</Link>
        </div>
      </Wrapper>
      {showResubscribe && <SubscribeForm />}
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        email
      }
    }
  }
`;

export default NewsletterPage;
