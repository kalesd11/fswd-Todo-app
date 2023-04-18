import axios from "axios";
import React, { useState } from "react";

const CreateTodo = () => {
  const [description, setdescription] = useState("");
  const [responsible, setresponsible] = useState("");
  const [priority, setpriority] = useState("");
  // const [complete, setcomplete] = useState(false);
   const onSubmit = (e)=>{
    e.preventDefault();
    let todo = {
      todo_description : description,
      todo_responsible : responsible,
      todo_priority : priority,
      todo_complete : false
    }
    axios.post('http://localhost:8083/addTodo',todo).then(res=>{
      console.log('Inserted')
    })
    setdescription('')
    setresponsible('')
    setpriority('')
   }
  return (
    <div className="container">
      <div className="container mt-5 shadow">
      <form className="container py-3 d-flex flex-column align-content-start" onSubmit={(e)=>onSubmit(e)}>
        <label
          htmlFor="description"
          className="my-1 form-label text-start text-danger"
        >
          <b>Description :</b>
        </label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <label
          htmlFor="responsible"
          className="my-1 form-label text-start text-danger"
        >
          <b>Responsible :</b>
        </label>
        <input
          type="text"
          name="responsible"
          className="form-control"
          value={responsible}
          onChange={(e) => setresponsible(e.target.value)}
        />
        <div className="d-flex align-baseline mt-3">
          <label className="form-check-label mx-2">Low</label>
          <input
            type="radio"
            name="priority"
            value="Low"
            onClick={(e) => setpriority(e.target.value)}
            className="form-check form-check-inline"
          />
          <label className="form-check-label mx-1">Medium</label>
          <input
            type="radio"
            name="priority"
            value="Medium"
            onClick={(e) => setpriority(e.target.value)}
            className="form-check form-check-inline"
          />
          <label className="form-check-label mx-1">High</label>
          <input
            type="radio"
            name="priority"
            value="High"
            onClick={(e) => setpriority(e.target.value)}
            className="form-check form-check-inline "
          />
        </div>
        <div className="d-flex justify-content-center mt-5">
        <button type="reset" className="btn btn-danger mx-3" onClick={()=>{setdescription('');setresponsible("")}}>Reset</button>
        <button type="submit" className="btn btn-success mx-3">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateTodo;
