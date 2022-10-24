import styled from "styled-components"
import {
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog"

import { darken, transparentize } from "polished"
import { ButtonHTMLAttributes } from "react"

export const DialogOverlay = styled(Overlay)`
  background: var(--title-color);
  opacity: 0.5;

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

  margin-top: 3.2rem;

  button[type="submit"] {
    height: 6.4rem;
    margin-top: 2.4rem;

    background: var(--green);
    color: var(--base-color);
    border-radius: 0.4rem;
    border: none;

    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 600;

    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.9);
    }
  }
`

export const DialogInput = styled.input`
  width: 100%;
  height: 6.4rem;

  background: #e7e9ee;
  padding: 2rem 2.4rem;

  &:not(:first-child) {
    margin-top: 1.6rem;
  }

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

export const DialogRadioContainer = styled.div`
  display: flex;
  gap: 0.8rem;

  margin-top: 1.6rem;
  align-items: center;
  justify-content: center;
`

interface DialogRadioButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean
  activeColor: string
}

export const DialogRadioButton = styled.button<DialogRadioButtonProps>`
  width: 100%;
  height: 6.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;

  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 400;

  background-color: ${(props) =>
    props.isActive
      ? transparentize(0.9, props.activeColor)
      : "transparent"};
  border-radius: 0.4rem;
  border: 1px solid #d7d7d7;

  transition: border-color 0.2s;

  & img {
    height: 2.5rem; // a bit bigger than figma's style
    width: 2.5rem;
  }

  & span {
    display: inline-block;
  }

  &:hover {
    border-color: ${darken(0.1, "#d7d7d7")};
  }
`
