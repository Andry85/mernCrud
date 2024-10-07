'use client'
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function updateUser({ params }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:3001/getUser/' + params.id)
    .then(function (response) {
      // handle success
      console.log(response);
      setName(response.data.name);
      setEmail(response.data.email);
      setAge(response.data.age);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }, []);

  const update = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3001/updateUser/' + params.id, {name, email, age})
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
      <div>My Post: {params.id}</div>
        <form onSubmit={update}>
          <h2>Update user</h2>
          <div className="mb-2">
            <label hmlFor="">Name</label>
            <input type="text" placeholder="Enter Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-2">
            <label hmlFor="">Email</label>
            <input type="email" placeholder="Enter Email" className="form-control" value={email}  onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-2">
            <label hmlFor="">Age</label>
            <input type="text" placeholder="Enter Age" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}
