import React, { useState } from 'react';
import * as S from './AddTodo.styles';





const AddTodo: React.FC = () => {
  
  
  const [text, setText  ] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Поле не может быть пустым');
      return;
    }
      

    setError('');
    setText('');
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.InputWrapper>
        <S.Input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError(''); //нихуя не ввоят ошибка принимается
          }}
          placeholder="Введите новую задачу..."
          $hasError={!!error}
        />
        <S.AddButton type="submit" disabled={!text.trim()}>
          Добавить
        </S.AddButton>
      </S.InputWrapper>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Form>
  );
};

export default AddTodo;