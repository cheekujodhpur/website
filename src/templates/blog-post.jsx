import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

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

  hr {
    border-color: ${({ theme }) => theme.colors.accent7.border};
  }

  blockquote {
    border-color: ${({ theme }) => theme.colors.accent7.border};
  }

  code {
    background: ${({ theme }) => theme.colors.accent7.borderBg};
  }

  .inner {
    margin: 0 auto;
    max-width: 65em;
    padding: 0 2em;
  }

  .image.left {
    float: left;
    margin: 0 1.5em 1em 0;
    top: 0.25em;

    img {
      width: 300px;
      border-radius: 3px;
    }
  }

  .image.fit {
    display: block;
    margin: 0 0 ${({ theme }) => theme.size.elementMargin} 0;
    width: 100%;

    img {
      width: 100%;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 4em 3em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 3em 2em;
  }
`;

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const { title, subtitle, date, image, mathjax } = post.frontmatter;
  const contentRef = useRef(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    container.querySelectorAll('a').forEach((link) => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

    // Execute script tags (innerHTML doesn't run them automatically)
    // External scripts must load sequentially before inline scripts run
    const scripts = Array.from(container.querySelectorAll('script'));
    const externalScripts = scripts.filter((s) => s.src);
    const inlineScripts = scripts.filter((s) => !s.src);

    const loadScript = (oldScript) =>
      new Promise((resolve) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.removeAttribute('defer');
        newScript.onload = resolve;
        newScript.onerror = resolve;
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });

    (async () => {
      for (const script of externalScripts) {
        await loadScript(script);
      }
      inlineScripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    })();
  }, []);

  return (
    <Layout>
      <SEO
        title={title}
        description={post.excerpt}
        pathname={post.fields.slug}
        mathjax={mathjax}
      />
      <article id="main">
        <ContentWrapper className="wrapper style5">
          <div className="inner">
            {image && (
              <span className="image left">
                <img src={image} alt="" />
              </span>
            )}
            <h2>{title}</h2>
            {subtitle && <h3>{subtitle}</h3>}
            <p><em>{date}</em></p>

            <div ref={contentRef} dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </ContentWrapper>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      frontmatter {
        title
        subtitle
        date(formatString: "D MMMM YYYY")
        image
        mathjax
      }
    }
  }
`;

export default BlogPostTemplate;
