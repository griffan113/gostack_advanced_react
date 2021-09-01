import styled, { css } from 'styled-components';
import ToolTip from '../Tooltip';

interface ContainerProps {
  isErrored: boolean;
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  color: #666360;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  transition: 0.2s;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #f4ede8;

    &:placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}
`;

export const Error = styled(ToolTip)`
  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }
`;
