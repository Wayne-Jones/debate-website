import React, {useState, useEffect} from 'react';
import firebase from './config';
import './App.css';

const db = firebase.firestore();

function App() {
  
  const [todoList, setToDoList] = useState([]);

  const addToDo = async (e) =>{
    e.preventDefault();
    const inputVal = e.target.todo.value;
    const res = await db.collection('todos').add({
      todo: inputVal,
    });
    console.log('Added document with ID: ', res.id);
  }

  useEffect(() => {
    console.log("Loaded");
    const unsubscribe = db.collection('todos').onSnapshot((snapshot) => {
      // snapshot.docChanges().forEach((change) => {
      //   console.log(change.doc.id);
      //   if (change.type === "added") {
      //     console.log("Added ", change.doc.data().todo);
      //     setToDoList((oldState) => [...oldState, change.doc]);
      //   }
      //   if (change.type === "modified") {
      //     console.log("Modify ", change.doc.data().todo);
      //     todoList[change.doc.id]
      //   }
      //   if (change.type === "removed") {
      //     console.log("Removed ", change.doc.data().todo);
      //   }

      // });

      const changes = snapshot.docs.map((doc)=>{
        return ({id: doc.id, ...doc.data()});
      });
      setToDoList(changes);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <form onSubmit={(e) => addToDo(e)}>
        <input name="todo" type="text" placeholder="todo task"/>
        <button type="submit">Submit Task</button>
      </form>
      
      <div>
        {todoList.map((doc)=>{
          return <li key={doc.id}>{doc.todo}</li>
        })}
      </div>
    </div>
  );
}

export default App;
