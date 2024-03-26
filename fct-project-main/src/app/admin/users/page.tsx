'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Users {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  subscribed: boolean;
  sentimentLeft: number
}

const UsersPage = () => {

  const [users, setUsers] = useState<Users[]>([]);

  useEffect(()=> {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersList = await axios.get('http://localhost:3000/getUsers')
      const users = usersList.data;
      console.log(users)
      setUsers(users);
    } catch (error) {
      console.error('Error with fetching users:', error);
    }
  }

  const handleDelete = async (id: String) => {
    console.log(id)
    try {
      await axios.delete(`http://localhost:3000/getUsers/${id}`);
      setUsers(users.filter(user => user.id !== id)); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
  <>
    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">+ Add user</button>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Subscription Status</th>
        <th>Sentiment Left</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {users.map((user, i) => {
        return (
  <tr className="hover" key={i}>
 <th>{i +1}</th>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td>{user?.isAdmin ? "Admin" : "User"}</td>
      <td>{user?.subscribed ? "Paid" : "FREE"}</td>
      <td>{user?.sentimentLeft}</td>
      <td>
      <button className="btn btn-outline btn-accent">Edit</button>
<button className="btn btn-outline btn-error" onClick={() => handleDelete(user.id)}>Delete</button>
      </td>
  </tr>
      )   
    })}
      
     
    </tbody>
  </table>
</div>
</>

  )
}

export default UsersPage