import { Todo } from '../classes';
import { todoList } from '../index';

//Referencias en el HTML
const divTodoList     = document.querySelector(".todo-list");
const txtInput        = document.querySelector(".new-todo");
const btnBorrar       = document.querySelector(".clear-completed");
const ulFilters       = document.querySelector(".filters");
const anchorFiltros   = document.querySelectorAll(".filtro");
 
export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ?  'completed' : ''}" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' } >
				<label> ${ todo.tarea } </label>
				<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', ( event )=> {
    if ( event.keyCode === 13 && txtInput.value.length > 0 ){
        
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        // console.log( todoList );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
        
    }
});

divTodoList.addEventListener('click', (event) => {

    // console.log(event.target.localName);//Para saber exactamente qué elemento se dió click
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;//div:event.target.parentElement  
    // li:event.target.parentElement.parentElement
    const todoId = todoElemento.getAttribute('data-id');//<li class="completed" data-id="abc"> Obtenemos el data-id
    
    if ( nombreElemento.includes('input') ){

        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');//Hacemos referencia al 1er elemento, luego a todas las clases de ese
        //elemento, luego para agregar o cambiar una clase: toggle
    }else if( nombreElemento.includes('button') ){
        todoList.eliminarTodo( todoId );//Lo borra del arreglo pero la referencia HTML aún existe
        divTodoList.removeChild( todoElemento );

    }
    
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    //Eliminaremos los objetos HTML de abajo hacia arriba porque si empezamos de arriba y eliminamos el primero
    //luego el índice del siguiente a cambiar se actualizará y puede ser que eliminemos el que no corresponde
    //al eliminar de abajo no afectamos el índice de los que están arriba de este
   
    
    for( let i = divTodoList.children.length-1; i >= 0; i-- ){//Arreglos comienzan de cero

        const elemento = divTodoList.children[i];
        if ( elemento.classList.contains('completed') ){//contains para saber si ese elemento tiene una clase
            divTodoList.removeChild( elemento );
        }
    }
    
});

ulFilters.addEventListener('click', ( event ) => {

    const filtro = event.target.text;
    // if ( !filtro ) return;//O así, es lo mismo:
    if ( !filtro ){ return; } 

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        
        switch( filtro ){
            
            case 'Pendientes':
                if ( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if ( !completado ){
                    elemento.classList.add('hidden');
                }
            break;

        }

    }

});

