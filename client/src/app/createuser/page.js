'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import styles from "./page.module.css";

export default function createUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const router = useRouter();


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createUser', {name, email, age})
    .then(function (response) {
      console.log(response);
      router.push('/');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 
 

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form>
          <h2>Add user</h2>
          <div className="mb-2">
            <label hmlFor="">Name</label>
            <input type="text" placeholder="Enter Name" className="form-control" onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label hmlFor="">Email</label>
            <input type="email" placeholder="Enter Email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label hmlFor="">Age</label>
            <input type="text" placeholder="Enter Age" className="form-control" onChange={(e) => setAge(e.target.value)}/>
          </div>
          <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}
