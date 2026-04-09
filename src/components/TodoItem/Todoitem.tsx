
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { editTodo, toggleTodoStatus, removeTodo } from '../../store/todoSlice';
import EditTodo from '../EditTodo/EditTodo';
import type { Todo } from '../../types/todo';
import * as S from './TodoItem.styles';
import { Trash2, Pencil } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = (newText: string) => {
    dispatch(editTodo({ id: todo.id, text: newText, completed: todo.completed }));
    setIsEditing(false);
  };

  const handleToggle = () => {
    dispatch(toggleTodoStatus(todo.id));
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      dispatch(removeTodo(todo.id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <S.ItemContainer>
        <EditTodo
          initialText={todo.text}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </S.ItemContainer>
    );
  }

  return (
    <S.ItemContainer>
      <S.CheckboxContainer>
        <S.Checkbox
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={todo.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
        />
      </S.CheckboxContainer>

      <S.Content $completed={todo.completed}>
        <S.Text>{todo.text}</S.Text>
        <S.Date>{formatDate(todo.createdAt)}</S.Date>
      </S.Content>

      <S.Actions>
        <S.EditButton
          onClick={() => setIsEditing(true)}
          title="Редактировать задачу"
          aria-label="Редактировать задачу"
        >
          <Pencil color="#ba3baf" />
          Редактировать
        </S.EditButton>
        
        <S.DeleteButton
          onClick={handleDelete}
          title="Удалить задачу"
          aria-label="Удалить задачу"
        >
          <Trash2 color="#3bba54" />
          Удалить
        </S.DeleteButton>
      </S.Actions>
    </S.ItemContainer>
  );
};

export default TodoItem;