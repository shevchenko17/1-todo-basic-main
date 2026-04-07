import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';       
import App from './App.tsx';
import { TodoProvider } from './contexts/TodoContext.tsx';
import store from './store';  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>                  {/* обёртка Redux */}
      <TodoProvider>
        <App />
      </TodoProvider>
    </Provider>
  </StrictMode>,
);