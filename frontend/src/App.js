import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/dist/collapse"
import Todos from './Components/Todos';
import CreateTodo from './Components/CreateTodo';
import EditTodo from './Components/EditTodo';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Todos/>}/>
        <Route path='/create-todo' element={<CreateTodo/>}/>
        <Route path='/edit-todo' element={<EditTodo/>}/>
      </Routes>
    </div>
  );
}

export default App;
