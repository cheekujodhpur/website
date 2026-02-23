import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,600italic,800,800italic');

  /* Reset */
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Basic */
  body {
    background: ${({ theme }) => theme.colors.bg};

    &.is-loading {
      *, *:before, *:after {
        animation: none !important;
        transition: none !important;
      }
    }
  }

  body, input, select, textarea {
    color: ${({ theme }) => theme.colors.fg};
    font-family: ${({ theme }) => theme.fonts.family};
    font-size: 15pt;
    font-weight: ${({ theme }) => theme.fonts.weight};
    letter-spacing: ${({ theme }) => theme.size.letterSpacing};
    line-height: 1.65em;

    @media (max-width: ${({ theme }) => theme.breakpoints.xlarge}) {
      font-size: 13pt;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
      font-size: 12pt;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
      font-size: 11pt;
      letter-spacing: 0.0375em;
    }
  }

  a {
    transition: color ${({ theme }) => theme.duration.transitions} ease,
                border-bottom-color ${({ theme }) => theme.duration.transitions} ease;
    border-bottom: dotted 1px;
    color: inherit;
    text-decoration: none;

    &:hover {
      border-bottom-color: transparent;
    }
  }

  strong, b {
    color: ${({ theme }) => theme.colors.fgBold};
    font-weight: ${({ theme }) => theme.fonts.weightBold};
  }

  em, i {
    font-style: italic;
  }

  p {
    margin: 0 0 ${({ theme }) => theme.size.elementMargin} 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.fgBold};
    font-weight: ${({ theme }) => theme.fonts.weightExtrabold};
    letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
    line-height: 1em;
    margin: 0 0 1em 0;
    text-transform: uppercase;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  h2 {
    font-size: 1.35em;
    line-height: 1.75em;

    @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
      font-size: 1.1em;
      line-height: 1.65em;
    }
  }

  h3 {
    font-size: 1.15em;
    line-height: 1.75em;

    @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
      font-size: 1em;
      line-height: 1.65em;
    }
  }

  h4 { font-size: 1em; line-height: 1.5em; }
  h5 { font-size: 0.8em; line-height: 1.5em; }
  h6 { font-size: 0.7em; line-height: 1.5em; }

  sub {
    font-size: 0.8em;
    position: relative;
    top: 0.5em;
  }

  sup {
    font-size: 0.8em;
    position: relative;
    top: -0.5em;
  }

  hr {
    border: 0;
    border-bottom: solid 2px ${({ theme }) => theme.colors.border};
    margin: 3em 0;

    &.major {
      margin: 4.5em 0;
    }
  }

  blockquote {
    border-left: solid 4px ${({ theme }) => theme.colors.border};
    font-style: italic;
    margin: 0 0 ${({ theme }) => theme.size.elementMargin} 0;
    padding: 0.5em 0 0.5em 2em;
  }

  code {
    background: ${({ theme }) => theme.colors.borderBg};
    border-radius: 3px;
    font-family: ${({ theme }) => theme.fonts.familyFixed};
    font-size: 0.9em;
    letter-spacing: 0;
    margin: 0 0.25em;
    padding: 0.25em 0.65em;
  }

  pre {
    -webkit-overflow-scrolling: touch;
    font-family: ${({ theme }) => theme.fonts.familyFixed};
    font-size: 0.9em;
    margin: 0 0 ${({ theme }) => theme.size.elementMargin} 0;

    code {
      display: block;
      line-height: 1.75em;
      padding: 1em 1.5em;
      overflow-x: auto;
    }
  }

  .align-left { text-align: left; }
  .align-center { text-align: center; }
  .align-right { text-align: right; }

  /* Section/Article */
  section, article {
    &.special {
      text-align: center;
    }
  }

  header {
    p {
      color: ${({ theme }) => theme.colors.fgLight};
      position: relative;
      top: -0.25em;
    }

    h3 + p {
      font-size: 1.1em;
    }

    h4 + p,
    h5 + p,
    h6 + p {
      font-size: 0.9em;
    }

    &.major {
      margin: 0 0 3.5em 0;

      h2, h3, h4, h5, h6 {
        border-bottom: solid 2px ${({ theme }) => theme.colors.border};
        display: inline-block;
        padding-bottom: 1em;
        position: relative;

        &:after {
          content: '';
          display: block;
          height: 1px;
        }
      }

      p {
        color: ${({ theme }) => theme.colors.fg};
        top: 0;
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
        margin: 0 0 ${({ theme }) => theme.size.elementMargin} 0;
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
      br {
        display: none;
      }
    }
  }

  /* Image */
  .image {
    border-radius: 3px;
    border: 0;
    display: inline-block;
    position: relative;

    img {
      border-radius: 3px;
      display: block;
    }

    &.left {
      float: left;
      margin: 0 1.5em 1em 0;
      top: 0.25em;

      img {
        width: 300px;
      }
    }

    &.right {
      float: right;
      margin: 0 0 1em 1.5em;
      top: 0.25em;
    }

    &.fit {
      display: block;
      margin: 0 0 ${({ theme }) => theme.size.elementMargin} 0;
      width: 100%;

      img {
        width: 100%;
      }
    }

    &.main {
      display: block;
      margin: 0 0 3em 0;
      width: 100%;

      img {
        width: 100%;
      }
    }
  }

  /* List */
  ol {
    list-style: decimal;
    margin: 0 0 ${({ theme }) => theme.size.elementMargin} 0;
    padding-left: 1.25em;

    li {
      padding-left: 0.25em;
    }
  }

  ul {
    list-style: disc;
    margin: 0 0 ${({ theme }) => theme.size.elementMargin} 0;
    padding-left: 1em;

    li {
      padding-left: 0.5em;
    }

    &.alt {
      list-style: none;
      padding-left: 0;

      li {
        border-top: solid 1px ${({ theme }) => theme.colors.border};
        padding: 0.5em 0;

        &:first-child {
          border-top: 0;
          padding-top: 0;
        }
      }
    }

    &.icons {
      cursor: default;
      list-style: none;
      padding-left: 0;

      li {
        display: inline-block;
        padding: 0 1em 0 0;

        &:last-child {
          padding-right: 0;
        }

        a {
          border-bottom: none;
        }
      }
    }

    &.actions {
      cursor: default;
      list-style: none;
      padding-left: 0;

      li {
        display: inline-block;
        padding: 0 1em 0 0;
        vertical-align: middle;

        &:last-child {
          padding-right: 0;
        }
      }

      &.special {
        justify-content: center;
        width: 100%;
        margin-left: 0;

        li {
          &:first-child {
            padding-left: 0;
          }
        }
      }

      &.stacked {
        li {
          display: block;
          padding: 1em 0 0 0;

          &:first-child {
            padding-top: 0;
          }
        }
      }

      &.fit {
        display: flex;
        width: calc(100% + 1em);

        li {
          flex-grow: 1;
          flex-shrink: 1;
          width: 100%;

          > * {
            width: 100%;
          }
        }

        &.stacked {
          width: 100%;
        }
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
        li {
          display: block;
          padding: 1em 0 0 0;
          text-align: center;
          width: 100%;

          &:first-child {
            padding-top: 0;
          }

          > * {
            width: 100%;
            max-width: 30em;
            margin: 0 auto;
          }
        }

        &.stacked {
          li {
            padding: 1em 0 0 0;

            &:first-child {
              padding-top: 0;
            }
          }
        }
      }
    }
  }

  dl {
    margin: 0 0 ${({ theme }) => theme.size.elementMargin} 0;

    dt {
      display: block;
      font-weight: ${({ theme }) => theme.fonts.weightBold};
      margin: 0 0 1em 0;
    }

    dd {
      margin-left: ${({ theme }) => theme.size.elementMargin};
    }
  }

  /* Button */
  input[type="submit"],
  input[type="reset"],
  input[type="button"],
  button,
  .button {
    appearance: none;
    transition: background-color ${({ theme }) => theme.duration.transitions} ease,
                color ${({ theme }) => theme.duration.transitions} ease;
    background-color: transparent;
    border-radius: 3px;
    border: 0;
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.fgBold};
    cursor: pointer;
    display: inline-block;
    font-size: 0.8em;
    font-weight: ${({ theme }) => theme.fonts.weightBold};
    height: 3.125em;
    letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
    line-height: 3.125em;
    padding: 0 2.75em;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;

    &:hover {
      background-color: ${({ theme }) => theme.colors.borderBg};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.border2Bg};
    }

    &.fit {
      display: block;
      margin: 0 0 1em 0;
      width: 100%;
    }

    &.special {
      background-color: ${({ theme }) => theme.colors.fgBold};
      color: ${({ theme }) => theme.colors.bg} !important;

      &:hover {
        background-color: ${({ theme }) => theme.colors.borderBg};
      }
    }

    &.disabled,
    &:disabled {
      pointer-events: none;
      opacity: 0.25;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
      height: 3.75em;
      line-height: 3.75em;
    }
  }

  /* Grid */
  .row {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: stretch;
    margin: 0 0 0 -1.5em;
    width: calc(100% + 1.5em);

    > * {
      box-sizing: border-box;
      padding: 0 0 0 1.5em;
    }

    &.uniform {
      > * {
        padding: 1.5em 0 0 1.5em;
      }
      margin: -1.5em 0 0 -1.5em;
    }

    &.gtr-uniform {
      > * {
        padding: 1.5em 0 0 1.5em;
      }
      margin: -1.5em 0 0 -1.5em;
    }
  }

  .\\31 2u, .\\31 2u\\$ { width: 100%; }
  .\\31 1u, .\\31 1u\\$ { width: 91.6666666667%; }
  .\\31 0u, .\\31 0u\\$ { width: 83.3333333333%; }
  .\\39 u, .\\39 u\\$ { width: 75%; }
  .\\38 u, .\\38 u\\$ { width: 66.6666666667%; }
  .\\37 u, .\\37 u\\$ { width: 58.3333333333%; }
  .\\36 u, .\\36 u\\$ { width: 50%; }
  .\\35 u, .\\35 u\\$ { width: 41.6666666667%; }
  .\\34 u, .\\34 u\\$ { width: 33.3333333333%; }
  .\\33 u, .\\33 u\\$ { width: 25%; }
  .\\32 u, .\\32 u\\$ { width: 16.6666666667%; }
  .\\31 u, .\\31 u\\$ { width: 8.3333333333%; }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    .\\31 2u\\$\\(medium\\),
    .\\36 u\\$\\(medium\\) { width: 100%; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    .\\31 2u\\$\\(small\\),
    .\\36 u\\$\\(small\\) { width: 100%; }
  }

  /* Box */
  .box {
    border-radius: 3px;
    border: solid 2px ${({ theme }) => theme.colors.border};
    margin-bottom: ${({ theme }) => theme.size.elementMargin};
    padding: 1.5em;

    > :last-child,
    > :last-child > :last-child,
    > :last-child > :last-child > :last-child {
      margin-bottom: 0;
    }

    &.alt {
      border: 0;
      border-radius: 0;
      padding: 0;
    }
  }

  /* Icon (Font Awesome) */
  .icon {
    text-decoration: none;
    border-bottom: none;
    position: relative;

    &:before {
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-family: FontAwesome;
      font-style: normal;
      font-weight: normal;
      text-transform: none !important;
    }

    > .label {
      display: none;
    }
  }

  /* Footnotes */
  .footnotes p {
    display: inline;
    font-size: small;
  }
`;

export default GlobalStyles;
