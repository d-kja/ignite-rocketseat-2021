import styled from "styled-components"

export const Container = styled.header`
  background: var(--accent-dark);
  color: var(--base-color);
`

export const Content = styled.div`
  max-width: 112rem;

  padding: 3.2rem 1.6rem 13.2rem;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background-color: var(--accent-light);
    color: inherit;

    border: none;
    border-radius: 0.5rem;

    line-height: 2.4rem;
    font-size: 1.6rem;
    font-weight: 600;

    height: 4.8rem;
    padding: 0 3.2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: filter 0.2s;

    &:focus {
      outline: none;
    }
    &:focus-within {
      box-shadow: 0 0 0 0.3rem var(--accent-darker);
    }

    &:hover {
      filter: brightness(0.9);
    }
  }
`
