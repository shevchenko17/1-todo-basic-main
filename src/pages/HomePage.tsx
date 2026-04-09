import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import TodoList from '../components/TodoList/TodoList';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: ${({ theme }) => theme.container};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
`;

const HomePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Container>
      <WelcomeMessage>
        Добро пожаловать, {user?.email}! 
      </WelcomeMessage>
      <TodoList />
    </Container>
  );
};

export default HomePage;