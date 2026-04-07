import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchTodos, createTodo, updateTodo, deleteTodo, toggleTodo,  type FetchTodosResponse } from '../api/todos';
import type { Todo } from '../types/todo';

interface TodoState {
  todos: Todo[];
  page: number;
  limit: number;
  filter: 'all' | 'active' | 'completed';
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  page: 1,
  limit: 10,
  filter: 'all',
  total: 0,
  loading: false,
  error: null,
};


export const loadTodos = createAsyncThunk(
  'todos/loadTodos',
  async ({ page, limit, filter }: { page: number; limit: number; filter: 'all' | 'active' | 'completed' }) => {
    const response = await fetchTodos(page, limit, filter);
    return response;
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (text: string, { dispatch, getState }) => {
    console.log({ text }, "12")
    await createTodo(text);
    const state = getState() as { todos: TodoState };
    const { page, limit, filter } = state.todos;
    dispatch(loadTodos({ page, limit, filter }));
  }
);


export const editTodo = createAsyncThunk(
  'todos/editTodo',

  async ({ id, text, completed }: { id: number; text: string; completed: boolean }, { dispatch, getState }) => {
console.log({id, text }, "12")
    await updateTodo(id, text, completed);

    const state = getState() as { todos: TodoState };
    const { page, limit, filter } = state.todos;
    await dispatch(loadTodos({ page, limit, filter }));
  }
);


export const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async (id: number, { dispatch, getState }) => {
    await deleteTodo(id);
    const state = getState() as { todos: TodoState };
    const { page, limit, filter } = state.todos;
    dispatch(loadTodos({ page, limit, filter }));
  }
);


export const toggleTodoStatus = createAsyncThunk(
  'todos/toggleTodoStatus',
  async (id: number, { dispatch, getState }) => {
    await toggleTodo(id);
    const state = getState() as { todos: TodoState };
    const { page, limit, filter } = state.todos;
    dispatch(loadTodos({ page, limit, filter }));
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1; 
    },
    setFilter(state, action: PayloadAction<'all' | 'active' | 'completed'>) {
      state.filter = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action: PayloadAction<FetchTodosResponse>) => {
        state.loading = false;
        state.todos = action.payload.data;
        state.total = action.payload.total;
     
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load todos';
      })
    
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add todo';
      })
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update todo';
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete todo';
      })
      .addCase(toggleTodoStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleTodoStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleTodoStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle todo';
      });
  },
});

export const { setPage, setLimit, setFilter } = todoSlice.actions;
export default todoSlice.reducer;