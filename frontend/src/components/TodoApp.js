import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  // Fetch todos from the backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos', error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      axios.post('http://localhost:8000/api/todos', { title: newTodo, completed: false })
        .then(response => {
          setTodos([...todos, response.data]);
          setNewTodo('');
        })
        .catch(error => console.error('Error adding todo', error));
    }
  };

  // Toggle the completion status of a todo
  const toggleTodo = (id, completed) => {
    axios.put(`http://localhost:8000/api/todos/${id}`, { completed: !completed })
      .then(response => {
        setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      })
      .catch(error => console.error('Error updating todo', error));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error('Error deleting todo', error));
  };

  return (
    <div>
      <h1>Todo List</h1>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add Task</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
