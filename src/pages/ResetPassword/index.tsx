import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { api } from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas devem ser iguais',
          ),
        });
        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          addToast({
            type: 'error',
            title: 'Erro ao resetar senha',
            description:
              'Ocorreu um erro ao resetar sua senha, tente novamente.',
          });

          return;
        }

        addToast({
          type: 'success',
          title: 'Senha alterada!',
          description: 'Você já pode logar na plataforma.',
        });

        api.post('/password/reset', {
          password,
          token,
        });

        // history.push('/');
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit} action="">
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />

            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmação de senha"
            />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
