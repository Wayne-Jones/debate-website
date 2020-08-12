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

  const getToDo = async () => {
    const querySnapshot = await db.collection('todos').get();
    
    querySnapshot.forEach(doc => {
      setToDoList([...todoList, doc])
      console.log(doc.id, '=>', doc.data());
    });
  }

  useEffect(() => {
    getToDo();
  }, [])

  return (
    <div className="App">
      <form onSubmit={(e) => addToDo(e)}>
        <input name="todo" type="text" placeholder="todo task"/>
        <button type="submit">Submit Task</button>
      </form>
      
      <div>
        {todoList.map((doc)=>{
          return <li key={doc.id}>{doc.data().todo}</li>
        })}
      </div>
    </div>
  );
}

export default App;
