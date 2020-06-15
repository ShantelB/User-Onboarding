import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Form';


function App() {
  const [members, setMembers] = useState([
    {
        id:0,
        name: '', 
        email: '',
        password: '',
        terms:'',
    },
  
  ]
  
  ) 
const addNewMember = member => {
  const newMember = {
    id:Date.now(),
    name:member.name,
    password: member.password,
    email: member.email,
  }
  setMembers([...members, newMember])
}

  return (
    <div className="App">

      <h1>Coding Members</h1>
     
      <Form addNewMember={addNewMember} members={members}/>
    </div>
  );
}

export default App;
