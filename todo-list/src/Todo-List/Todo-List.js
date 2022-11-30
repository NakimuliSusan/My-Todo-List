import React, {useEffect} from "react";
import '/home/user/Documents/My-Todo-List/todo-list/src/Todo-List/Todo-List.css'


const TodoList = () =>{
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");
  
    useEffect(() => {
      const json = localStorage.getItem("todos");
      const loadedTodos = JSON.parse(json);
      if (loadedTodos) {
        setTodos(loadedTodos);
      }
    }, []);
  
    useEffect(() => {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }, [todos]);
    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        });
        setTodos(updatedTodos);
      }
    
      function submitEdits(id) {
        const updatedTodos = [...todos].map((todo) => {
          if (todo.id === id) {
            todo.text = editingText;
          }
          return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
      }
      function handleSubmit(e) {
        e.preventDefault();
    
        const newTodo = {
          id: new Date().getTime(),
          text: todo,
          completed: false,
        };
        setTodos([...todos].concat(newTodo));
        setTodo("");
      }
    
      function deleteTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      }
return (
    <div>
        <div>
      <h3>Suzie's Todo List</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter tasks....."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
       <span><button className="add" type="submit">Add Todo</button></span>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
    </div>
)

}

export default TodoList;