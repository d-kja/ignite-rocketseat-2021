import styled from "styled-components"
import {
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog"

export const DialogOverlay = styled(Overlay)`
  background: var(--title-color);
  opacity: 0.4;

  position: fixed;
  inset: 0;
`
export const DialogContent = styled(Content)`
  transform: translateX(-50%) translateY(-50%);
  position: fixed;
  top: 50%;
  left: 50%;

  max-width: 58.8rem;
  width: 100%;

  padding: 6.4rem 4.8rem;
  border-radius: 0.5rem;
  background: var(--bg-color);

  display: flex;
  flex-direction: column;
`

export const DialogClose = styled(Close)`
  background-color: transparent;
  border: none;

  & > svg {
    position: absolute;
    top: 2.1rem;
    right: 2.1rem;

    width: 1.8rem;
    height: 1.8rem;

    color: var(--text-color);
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.5);
    }
  }

  &:focus {
    outline: none;
  }
  &:focus-within svg {
    filter: brightness(0.5);
  }
`

export const DialogTitle = styled(Title)`
  line-height: 3.6rem;
  font-weight: 600;
  font-size: 2.4rem;

  color: var(--title-color);
`

export const DialogForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1.6rem;
  margin-top: 3.2rem;
`

export const DialogInput = styled.input`
  width: 100%;
  height: 6.4rem;

  background: #e7e9ee;
  padding: 2rem 2.4rem;

  &::placeholder {
    color: var(--text-color);

    font-weight: 400;
    line-height: 2.4rem;
    font-size: 1.6rem;
    text-transform: capitalize;
  }

  border: 0.1rem solid #d7d7d7;
  border-radius: 0.5rem;

  transition: border-color 0.2s;

  &:focus {
    outline: none;
  }
  &:focus-within {
    border-color: #bdbdbd;
  }
`
