import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import {
  Container,
  Content,
  Background,
  AnimationContainer,
  AvatarInput,
} from './styles';
import { useToast } from '../../hooks/toast';
import { api } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { handleImageFormats } from '../../utils/handleImageFormats';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [avatar, setAvatar] = useState<File | string>('');

  const patchUserAvatar = useCallback(async (file: File | string) => {
    if (file && typeof file !== 'string') {
      const imageData = new FormData();
      imageData.append('file', file);

      try {
        await api.patch('/users/avatar', imageData);
      } catch (err) {
        throw new Error();
      }
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        if (!avatar) {
          addToast({
            type: 'error',
            title: 'Avatar ausente',
            description: 'Selecione um avatar para continuar o cadastro',
          });

          return;
        }

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        try {
          const formData = new FormData();
          formData.append('avatar', avatar);
          formData.append('password', data.password);
          formData.append('name', data.name);
          formData.append('email', data.email);

          try {
            // await api.patch('/users/avatar', imageData);
            await api.post('/users', formData);
          } catch (err) {
            throw new Error();
          }

          history.push('/');

          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Usuário cadastrado com sucesso!',
          });
        } catch (err: any) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
            return;
          }

          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Erro ao cadastrar o usuário',
          });
        }
      } catch (err: any) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        console.error(err);
      }
    },
    [addToast, history, avatar],
  );

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files) {
      setAvatar(event.target.files[0]);
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit} action="">
            <h1>Faça seu cadastro</h1>
            <AvatarInput>
              <img
                src={handleImageFormats({ image: avatar })}
                alt="user_avatar"
              />
              <label htmlFor="avatar">
                <FiCamera />

                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  onChange={handleSelectImage}
                />
              </label>
            </AvatarInput>
            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input
              icon={FiMail}
              name="email"
              type="email"
              placeholder="E-mail"
            />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            {' '}
            <FiArrowLeft />
            Voltar para o Log In
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
