import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: #f0f2f5;
    --title-color: #363f5f;
    --text-color: #969cb3;

    --red: #e62e40;
    --green: #33cc95;
    --accent-dark: #5429cc;
    --accent-darker: #5d27b4;
    --accent-light: #6933FF;
    
    --other: #e5e5e5;
    --base-color: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; // 10px
  }
  
  body {
    background-color: var(--bg-color);
    -webkit-font-smoothing: antialiased;
  }
  
  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
