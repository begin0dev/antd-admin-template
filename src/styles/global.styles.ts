import { css } from "@emotion/react";

export const globalStyles = css`
  html,
  body,
  #root {
    height: 100%;
  }
  body,
  header,
  footer,
  main,
  nav,
  div,
  article,
  section,
  button {
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
`;
