import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, changePassword, clearError } from '../store/authSlice';
import {type RootState, type  AppDispatch } from '../store';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.container};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  border-bottom: 2px solid ${({ theme }) => theme.button};
  padding-bottom: 10px;
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  display: block;
  margin-bottom: 5px;
`;

const Value = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.input};
  border-radius: 6px;
  color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.input};
  color: ${({ theme }) => theme.text};
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.button};
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: ${({ theme }) => theme.button};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.buttonHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.deleteButton};
  font-size: 14px;
  text-align: center;
  padding: 10px;
  background-color: ${({ theme }) => `${theme.deleteButton}20`};
  border-radius: 6px;
`;

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.button};
  font-size: 14px;
  text-align: center;
  padding: 10px;
  background-color: ${({ theme }) => `${theme.button}20`};
  border-radius: 6px;
`;

const ProfilePage: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const { user, status, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearError()), 3000);
    }
  }, [error, dispatch]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (newPassword.length < 6) {
      setPasswordError('Новый пароль должен содержать минимум 6 символов');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Новые пароли не совпадают');
      return;
    }
    
    setPasswordError('');
    
    const result = await dispatch(changePassword({ oldPassword, newPassword }));
    
    if (result.meta.requestStatus === 'fulfilled') {
      setSuccessMessage('Пароль успешно изменен!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (!user) {
    return <Container>Загрузка...</Container>;
  }

  return (
    <Container>
      <Card>
        <Title>Профиль пользователя</Title>
        <Field>
          <Label>Email</Label>
          <Value>{user.email}</Value>
        </Field>
        <Field>
          <Label>Дата регистрации</Label>
          <Value>{new Date(user.createdAt).toLocaleDateString('ru-RU')}</Value>
        </Field>
      </Card>

      <Card>
        <Title>Смена пароля</Title>
        <Form onSubmit={handleChangePassword}>
          <FormGroup>
            <Label>Старый пароль</Label>
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Новый пароль (минимум 6 символов)</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Подтверждение нового пароля</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Изменение...' : 'Изменить пароль'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ProfilePage;