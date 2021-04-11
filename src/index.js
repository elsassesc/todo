import { Todo, TodoList } from './classes';//Va buscar el index.js por defecto
import { crearTodoHtml } from './js/componentes';

import './styles.css';

export const todoList = new TodoList();

// const tarea = new Todo('Aprender Javascript');
// todoList.nuevoTodo( tarea );
// crearTodoHtml( tarea );


// localStorage.setItem('mi-key','ABC1234');
// sessionStorage.setItem('mi-key','ABC1234');

// setTimeout(() => {
//     localStorage.removeItem('mi-key');
// }, 1500);//1 segundo y medio

// todoList.todos.forEach( todo => crearTodoHtml( todo ) );//Cuando solo el argumento que se quiere enviar
// es el único que se envía entonces se puede reducir así (cuando es solo 1 argumento):

todoList.todos.forEach( crearTodoHtml );

// const newTodo = new Todo('Aprender JS');
// todoList.nuevoTodo( newTodo );

// todoList.todos[0].imprimirClase();
// newTodo.imprimirClase();

// console.log( 'todos', todoList.todos );