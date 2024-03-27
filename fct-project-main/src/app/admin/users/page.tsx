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
  const [showForm, setShowForm] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isAdmin, setAdmin] = useState(false);
const [sentiment, setSentiment] = useState("");
const [subscriptionStatus, setsubscriptionStatus] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const form = (<>
<input 
type="text"
id="name"
placeholder="Name" 
className="input input-bordered w-full max-w-xs" 
value={name}
onChange={event => setName(event.target.value)}
/>
<input
type="text" 
id="email"
placeholder="Email"
className="input input-bordered w-full max-w-xs"
value={email}
onChange={event => setEmail(event.target.value)}
/>
<input 
type="password" 
id="password"
placeholder="Password" 
className="input input-bordered w-full max-w-xs" 
value={password}
onChange={event =>setPassword(event.target.value)}
/>
<select 
  id="isAdmin" 
  className="select select-bordered w-full max-w-xs"
  value={isAdmin ? 'Admin' : 'User'}
  onChange={event => setAdmin(event.target.value === 'Admin')}>
        <option value=''>Role</option>
        <option>Admin</option>
        <option>User</option>
</select>

<input 
type="text" 
id="sentiment"
placeholder="Enter sentiment" 
className="input input-bordered w-full max-w-xs" 
value={sentiment.toString()}
onChange={event => setSentiment(parseInt(event.target.value) as number)}
/>

<select 
id="subscription"
className="select select-bordered w-full max-w-xs">
  <option>Subscription status?</option>
  <option>FREE</option>
  <option>Paid</option>
</select>
<button type="submit" className="btn btn-secondary">Submit</button>
</>
  )


  useEffect(()=> {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersList = await axios.get('http://localhost:3000/getUsers')
      const users = usersList.data;
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

  const handleSubscription = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("here")
  };

  return (
  <>
    {/* <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">+ Add user</button> */}


    <label htmlFor="my_modal_7" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary" onClick={toggleForm}>+ Add user</label>
    {showForm && (
        <form className="form-container w-1/3" onSubmit={handleSubscription}>
          {form}
        </form>
      )}
    <div className="overflow-x-auto">
  <table className="table w-2/3">
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