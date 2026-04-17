import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
     background: string;
    text: string;
    container: string;
    input: string;
    button: string;
    buttonHover: string;
    border: string;
    completed: string;
    deleteButton: string;
    editButton: string;
  }
}