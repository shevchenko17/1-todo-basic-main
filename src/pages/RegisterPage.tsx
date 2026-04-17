import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearError } from '../store/authSlice';
import { type RootState, type AppDispatch } from '../store';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: ${({ theme }) => theme.container};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
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

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
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

const LoginLink = styled.p`
  text-align: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.text};

  a {
    color: ${({ theme }) => theme.button};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<string>('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);


const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    setEmailError('Введите корректный email (например: user@example.com)');
    return false;
  }
  setEmailError('');
  return true;
};


  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }
    
    if (password.length < 6) {
      setPasswordError('Пароль должен содержать минимум 6 символов');
      return;
    }
    
    setPasswordError('');
    await dispatch(registerUser({ 
      email, 
      password, 
      age: age ? parseInt(age) : undefined 
    }));
  };

  return (
    <Container>
      <Title>Регистрация</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="user@example.com"
          />
         {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Пароль (минимум 6 символов)</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••"
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Возраст (опционально)</Label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="150"
            placeholder="25"
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </Form>
      <LoginLink>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </LoginLink>
    </Container>
  );
};

export default RegisterPage;