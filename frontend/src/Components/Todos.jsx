import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Todos() {
  const [todos, settodos] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:8083/");
      settodos(response.data);
    };
    getData();
  }, []);
  // useEffect(()=>{
  //   axios.get('http://localhost:8083/').then(res=>{
  //     settodos(res.data)
  //   })
  // },[])
  // console.log(todos)
  return (
    <div className="container mt-5 shadow-sm">
      <table className="table table-striped">
        <thead className="text-danger">
          <tr>
            <th>Sr.No</th>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{todo.todo_description}</td>
                <td>{todo.todo_responsible}</td>
                <td>{todo.todo_priority}</td>
                <td className="d-flex justify-content-center">
                  <Link className="btn btn-warning btn-sm mx-1" to="/edit-todo">
                    Edit
                  </Link>
                  <Link className="btn btn-danger btn-sm mx-1" onClick={()=>{
                    axios.delete('http://localhost:8083/deleteTodo/'+todo._id).then(()=>{
                      window.location.reload()
                    })
                  }}>Delete</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Todos;
