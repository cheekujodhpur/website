import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, pathname, mathjax }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  const seo = {
    title: title
      ? `${title} - Kumar Ayush`
      : `Kumar Ayush`,
    description: description || site.siteMetadata.description,
    url: `${site.siteMetadata.siteUrl}${pathname || ''}`,
    image: `${site.siteMetadata.siteUrl}/images/me_reading.jpg`,
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={seo.url} />
        <link rel="alternate" type="application/rss+xml" title={site.siteMetadata.title} href={`${site.siteMetadata.siteUrl}/feed.xml`} />

        {/* Open Graph */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.url} />
        <meta property="og:image" content={seo.image} />

        {/* Font Awesome */}
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
      </Helmet>
      {mathjax && (
        <Helmet>
          <script type="text/x-mathjax-config">{`
            MathJax.Hub.Config({
              tex2jax: {
                inlineMath: [['$','$'], ["\\\\(","\\\\)"]],
                processEscapes: true
              }
            });
          `}</script>
          <script
            type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
          />
        </Helmet>
      )}
    </>
  );
};

export default SEO;
