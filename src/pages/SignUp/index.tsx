import React from 'react';
import { FiArrowLeft, FiLogIn, FiUser, FiMail, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logo} alt="GoBarber" />
      <form action="">
        <h1>Faça seu cadastro</h1>
        <Input icon={FiUser} name="user" placeholder="Nome" />
        <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="login">
        {' '}
        <FiArrowLeft />
        Voltar para o Log In
      </a>
    </Content>
  </Container>
);

export default SignUp;
