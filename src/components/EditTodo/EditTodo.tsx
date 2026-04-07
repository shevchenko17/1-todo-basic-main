import React, { useState, useEffect, useRef } from 'react';
import * as S from './EditTodo.styles';
interface EditTodoProps {
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({
  initialText,
  onSave,
  onCancel,
}) => {
  const [text, setText] = useState(initialText);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

 
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
     
      inputRef.current.setSelectionRange(text.length, text.length);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedText = text.trim();

    // Валидация
    if (!trimmedText) {
      setError('Поле не может быть пустым');
      return;
    }

    if (trimmedText.length > 200) {
      setError('Задача не может быть длиннее 200 символов');
      return;
    }

   
    if (trimmedText === initialText) {
      onCancel();
      return;
    }

   console.log('EditTodo onSave', trimmedText);
    onSave(trimmedText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
  
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }

    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

  
    if (error) {
      setError('');
    }
  };

  return (
    <S.EditForm onSubmit={handleSubmit}>
      <S.InputWrapper>
        <S.EditInput
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Введите текст задачи..."
          $hasError={!!error}
          maxLength={200}
        />
        
        <S.ButtonsContainer>
          <S.SaveButton
            type="submit"
            title="Сохранить изменения (Enter)"
            aria-label="Сохранить изменения"
          >
            <S.SaveIcon>✓</S.SaveIcon>
            Сохранить
          </S.SaveButton>
          
          <S.CancelButton
            type="button"
            onClick={onCancel}
            title="Отменить редактирование (Esc)"
            aria-label="Отменить редактирование"
          >
            <S.CancelIcon>✕</S.CancelIcon>
            Отмена
          </S.CancelButton>
        </S.ButtonsContainer>
      </S.InputWrapper>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      
      <S.CharCount>
        {text.length}/200 символов
      </S.CharCount>
    </S.EditForm>
  );
};

export default EditTodo;