import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setTodos(data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      const data = await response.json()
      if(data.status === 200){
        setTodos(todos.filter(todo => todo.todo_id !== id))
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <th scope="col">{todo.description}</th>
                <th scope="col"><EditTodo todo={todo}/></th>
                <th scope="col"><button className="btn btn-danger" onClick={()=> deleteTodo(todo.todo_id)} > Delete </button></th>
              </tr>
            );
          })}
          {/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
