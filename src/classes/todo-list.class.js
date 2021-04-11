import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);//!= diferente   !==diferente por idéntidad, tipo y valor
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {//== porque uno es string y el otro es number
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        // localStorage.setItem('todo', this.todos );//localStorage lo convertirá a un string [object Object] 
        // porque solo almacena string
        // Por eso debemos convertirlo a Json con el objeto JSON:
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {

        // if (localStorage.getItem('todo')) {//Verificar que existe

        //     // this.todos = localStorage.getItem('todo');
        //     // console.log('cargarLocal:',this.todos);
        //     // console.log(typeof this.todos);//Para ver el tipo que regresa (string)
        //     //Entonces debemos convertirlo de string a un arreglo
            
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        //     console.log('cargarLocal:',this.todos);
        //     console.log(typeof this.todos);//Para ver el tipo que regresa (object)

        // } else {

        //     this.todos = [];

        // }

        this.todos = ( localStorage.getItem('todo') ) 
                        ? JSON.parse(localStorage.getItem('todo')) 
                        : [];
        
        //Map permite barrer cada uno de los elementos que están dentro de un arreglo
        // y retornar un arreglo con cada uno de sus objetos mutados
        // Array.prototype.map()
        // El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
        // this.todos = this.todos.map( obj => Todo.fromJson( obj) );//Cuando solo el argumento que se quiere enviar
        // es el único que se envía entonces se puede reducir así (cuando es solo 1 argumento, 
        // reduciendo el código):
        this.todos = this.todos.map(  Todo.fromJson );
    }
}

