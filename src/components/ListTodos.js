import { useEffect, useState } from 'react';

import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
      console.log(res);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchTodos = async () => {
    try {
      const url = 'http://localhost:5000/todos';
      let res = await fetch(url);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <h1>List Todos</h1>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">todo id</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.todo_id}</td>
              <td>{todo.description}</td>
              <td>
                {' '}
                <EditTodo />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteTodo(todo.todo_id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ListTodos;
