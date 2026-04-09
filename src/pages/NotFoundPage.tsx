import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
  padding: 40px;
  background-color: ${({ theme }) => theme.container};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 72px;
  color: ${({ theme }) => theme.button};
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 30px;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.button};
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Title>404</Title>
      <Message>Страница не найдена</Message>
      <HomeLink to="/">Вернуться на главную</HomeLink>
    </Container>
  );
};

export default NotFoundPage;