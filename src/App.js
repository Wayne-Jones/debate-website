import React, {useState, useEffect} from 'react';
import firebase from './config';
import './App.css';

function App() {
  const [todoList, setToDoList] = useState([]);

  const db = firebase.firestore();

  const addToDo = async (e) =>{
    e.preventDefault();
    const inputVal = e.target.todo.value;
    const res = await db.collection('todos').add({
      todo: inputVal,
    });
    console.log('Added document with ID: ', res.id);
    setToDoList([...todoList, inputVal]);
  }
  
  return (
    <div className="App">
      <form onSubmit={(e) => addToDo(e)}>
        <input name="todo" type="text" placeholder="todo task"/>
        <button type="submit">Submit Task</button>
      </form>
      
      <div>
        {todoList.map((todo)=>{
          return <li key={todo._id}>{todo}</li>
        })}
      </div>
    </div>
  );
}

export default App;
