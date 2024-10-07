"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./page.module.css";
import Link from 'next/link';


export default function Users() {

  const [users, setUsers] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3001/')
      .then(function (response) {
        // handle success
        console.log(response);
        setUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }, []);

    const handleDelete = (id) => {
      axios.delete('http://localhost:3001/deleteUser/' + id)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link href="/createuser" className="btn btn-success">Add +</Link>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link href={`/updateuser/${user._id}`} className="btn btn-success">Update</Link>
                  <button onClick={(e) => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
