import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditTodo = () => {
  const [description, setDescription] = useState('')
  const [responsible, setResponsible] = useState('')
  const [priority, setPriority] = useState('')
  const [completed, setCompleted] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(()=>{
    const getData = async () => {
      const response = await axios.get(`http://localhost:8083/${id}`);
      const data = await response.data
      // console.log(response.data)
      setDescription(data[0].todo_description)
      setResponsible(data[0].todo_responsible)
      setPriority(data[0].todo_priority)
      setCompleted(data[0].todo_completed)
    };
    getData()
  },[id])
  const onsubmit = (e) =>{
    e.preventDefault()
   
      let data = {
        todo_description:description ,
        todo_responsible: responsible,
        todo_priority: priority,
        todo_completed: completed
      }
      axios.put(`http://localhost:8083/update/${id}`, data).then(res=>{
        console.log('updated')
       
      })
   
   
  }
  return (
    <div className="container mt-5 shadow">
      <div className="container ">
        <form className="container py-3" onSubmit={(e)=>{onsubmit(e); navigate('/')}}>
          <div className="mt-3-3 text-start text-success">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <b>Description :</b>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Edit Your Todo"
            />
          </div>
          <div className="mt-3 text-start text-success">
          
            <label htmlFor="exampleInputPassword1" className="form-label ">
              <b>Responsible :</b>
            </label>
            <input
              type="text"
              value={responsible}
              onChange={(e)=>setResponsible(e.target.value)}
              className="form-control"
              placeholder="Responsible"
            />
          </div>

          <div className="my-4 ">
          <h5 className="text-danger">Priority:</h5>
            <label htmlFor="Low" className="text-danger">
              <b>Low</b>
            </label>
            <input
              type="radio"
              className="form-check-input mx-2 "
              value="Low"
              onClick={(e)=>setPriority(e.target.value)}
              name="priority"
            />
            <label htmlFor="Medium" className="text-info">
              <b>Medium</b>
            </label>
            <input
              type="radio"
              className="form-check-input mx-2"
              value="Medium"
              onClick={(e)=>setPriority(e.target.value)}
              name="priority"
            />
            <label htmlFor="High" className="text-success">
              <b>High</b>
            </label>
            <input
              type="radio"
              className="form-check-input mx-2"
              value="High"
              onClick={(e)=>setPriority(e.target.value)}
              name="priority"
            />
          </div>
          <div className="d-flex justify-content-center mb-2">
            <button type="reset" className="btn btn-warning mx-2 ">
              Cancel
            </button>
            <button type="submit" className="btn btn-success mx-2 ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
