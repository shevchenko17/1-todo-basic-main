import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {  type AppDispatch,type RootState } from '../../store';
import {
  loadTodos,
  setPage,
  setLimit,
  setFilter,
  addTodo,
  toggleTodoStatus,
  removeTodo,
} from '../../store/todoSlice';
import {
 type SelectChangeEvent,
  CircularProgress,
  Alert,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
} from '@mui/material';
import TodoItem from '../TodoItem/Todoitem';
import * as S from './TodoList.styles';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, page, limit, filter, total, loading, error } = useSelector(
    (state: RootState) => state.todos
  );

  const [newTodoText, setNewTodoText] = useState('');


  useEffect(() => {
    dispatch(loadTodos({ page, limit, filter }));
  }, [dispatch, page, limit, filter]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  const handleLimitChange = (event: SelectChangeEvent <number>) => {
    dispatch(setLimit( Number(event.target.value)));
  };

  const handleFilterChange = ( event: SelectChangeEvent) => {
    dispatch(setFilter(event.target.value as 'all' | 'active' | 'completed'));
  };

  const handleAddTodo = async () => {
    if (newTodoText.trim()) {
      await dispatch(addTodo(newTodoText.trim()));
      setNewTodoText('');
    }
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodoStatus(id));
  };

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id));
  };

  const totalPages = Math.ceil(total / limit);

 
  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <S.Container>
      <S.Header>
        <S.Title>Список задач</S.Title>
        <S.Stats>
          Активных: {activeCount} | Выполненных: {completedCount} | Всего: {total}
        </S.Stats>
      </S.Header>

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          label="Новая задача"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <Button variant="contained" onClick={handleAddTodo} disabled={loading}>
          Добавить
        </Button>
      </Box>

      <S.Controls>
        <S.SelectGroup>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Фильтр</InputLabel>
            <Select value={filter} onChange={handleFilterChange} label="Фильтр">
              <MenuItem value="all">Все задачи</MenuItem>
              <MenuItem value="active">Активные</MenuItem>
              <MenuItem value="completed">Выполненные</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>На странице</InputLabel>
            <Select value={limit} onChange={handleLimitChange} label="На странице">
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </S.SelectGroup>
      </S.Controls>

     
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}

    
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

    
      {!loading && !error && (
        <>
          {todos.length === 0 ? (
            <S.EmptyState>
              {total === 0
                ? 'Задачи отсутствуют. Добавьте первую задачу!'
                : 'Задачи не найдены по выбранному фильтру'}
            </S.EmptyState>
          ) : (
            <S.List>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => handleToggle(todo.id)}
                  onDelete={() => handleDelete(todo.id)}
                />
              ))}
            </S.List>
          )}

        
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </S.Container>
  );
};

export default TodoList;