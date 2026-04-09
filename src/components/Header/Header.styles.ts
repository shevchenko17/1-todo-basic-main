import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.container};
  padding: 20px 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 15px 20px;
    flex-direction: column;
    gap: 15px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoIcon = styled.span`
  background-color: ${({ theme }) => theme.button};
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.button} 0%, ${({ theme }) => theme.editButton} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ThemeToggle = styled.button`
  background-color: ${({ theme }) => theme.input};
  border: 2px solid ${({ theme }) => theme.border};
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.button};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.button}40;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const ThemeIcon = styled.span`
  font-size: 20px;
`;

export const ThemeText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;


export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.button};
  }
`;

export const LogoutButton = styled.button`
  background-color: ${({ theme }) => theme.deleteButton};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;