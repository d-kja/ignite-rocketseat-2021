import styled from "styled-components"

export const Container = styled.div`
  margin-top: 6.4rem;

  table {
    width: 100%;
    border-spacing: 0 0.8rem;

    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 400;

    th {
      color: var(--text-color);

      padding: 1.6rem 3.2rem;

      text-align: left;
      font-weight: inherit;
    }

    td {
      background-color: var(--base-color);
      color: var(--text-color);

      &:first-child {
        color: var(--title-color);
      }

      &:nth-child(2) {
        &.income {
          color: var(--green);
        }
        &.outcome {
          color: var(--red);
        }
      }

      border: none;
      border-radius: 0.4rem;
      padding: 1.6rem 3.2rem;

      font-weight: 400;
    }
  }
`
