import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 3.2rem;
  margin-top: -11rem;

  div {
    background: var(--base-color);
    color: var(--title-color);

    padding: 2.6rem 3.2rem;
    border-radius: 0.4rem;

    &:last-child {
      background-color: var(--green);
      color: var(--base-color);
    }

    header {
      p {
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2.4rem;
      }

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: inline-block;
      margin-top: 1.4rem;

      font-size: 3.6rem;
      line-height: 5.4rem;
      font-weight: 500;
    }
  }
`
