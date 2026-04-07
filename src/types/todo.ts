export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type SortOption = 'newest' | 'oldest';
export type FilterOption = 'all' | 'active' | 'completed';

export interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
  clearCompleted?: () => void;
  markAllCompleted?: () => void;
  markAllIncomplete?: () => void;
}