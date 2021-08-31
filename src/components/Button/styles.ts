import { shade } from 'polished';

import styled from 'styled-components';

export const Container = styled.button`
  background: var(--primary);

  border-radius: 10px;
  border: 0;

  margin-top: 16px;
  padding: 0 16px;
  height: 56px;
  width: 100%;

  color: #312e38;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
