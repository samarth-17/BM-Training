import { useState , useEffect } from 'react'
import './App.css'


function App() {

  const[task , setTask]=useState("");
  const [toDo, settoDo] = useState([]);
  const[indexedit , setindex]=useState(null);

  useEffect( ()=>{
    if(indexedit!=null){
      setTask(toDo[indexedit]);
    }
  });
  const addTodo=(e)=>{
    e.preventDefault();
    if(indexedit == null){
    settoDo([...toDo , task]);
    setTask("");
    console.log("task added" , task);
  
  }
  else{
    const editedToDo=[...toDo];
    editedToDo[indexedit]=task;
    settoDo(editedToDo);
    setindex(null)
  }

  setTask("");
}

  const delToDo=(t)=>{
    const newtodo=toDo.filter((task)=> task!==t);
    settoDo(newtodo); 
    console.log("deleted" , newtodo);
  };

  const editToDo=(i)=>{
    setindex(i);
  }
  

  return (
    <div>
    <h1>TO-DO</h1>
    <form id="todocont">
      <input type="text" placeholder='Enter Task' value={task} onChange={(e)=>{setTask(e.target.value)}}></input>
      <button id="addbuttn" onClick={addTodo}>
      {indexedit===null ? "Add Task" : "Update Task"}
      </button>

      </form>
      <div>
      <ul>
        {toDo.map((task , i)=>(
          <li key={i}>{i+1}.{task}
          <button onClick={()=>delToDo(task)}>Delete</button>
          <button onClick={()=>editToDo(i)}>edit</button>
          </li>
        
        ))}
      </ul>
      </div>
    </div>
  )
}

export default App
