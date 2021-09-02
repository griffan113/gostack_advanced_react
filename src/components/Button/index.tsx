import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = {
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container {...rest}>{loading ? 'Carregando...' : children}</Container>
);

export default Button;
