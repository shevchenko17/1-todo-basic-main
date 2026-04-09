import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../contexts/ThemeContext';
import { logout } from '../../store/authSlice';
import { type RootState } from '../../store';
import * as S from './Header.styles';


const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <S.HeaderContainer>
      <S.Logo>
        <S.LogoIcon>✓</S.LogoIcon>
        <S.Title>To-Do List</S.Title>
      </S.Logo>
      
      <S.NavLinks>
        {token ? (
          <>
            <S.NavLink to="/">Главная</S.NavLink>
            <S.NavLink to="/profile">Профиль</S.NavLink>
            <S.LogoutButton onClick={handleLogout}>Выйти</S.LogoutButton>
          </>
        ) : (
          <>
            <S.NavLink to="/login">Вход</S.NavLink>
            <S.NavLink to="/register">Регистрация</S.NavLink>
          </>
        )}
        
        <S.ThemeToggle 
          onClick={toggleTheme}
          aria-label={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
          title={`Текущая тема: ${theme === 'light' ? 'светлая' : 'тёмная'}`}
        >
          <S.ThemeIcon>
            {theme === 'light' ? '🌙' : '☀️'}
          </S.ThemeIcon>
          <S.ThemeText>
            {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          </S.ThemeText>
        </S.ThemeToggle>
      </S.NavLinks>
    </S.HeaderContainer>
  );
};

export default Header;