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
  const [id, setId] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isAdmin, setAdmin] = useState(false);
const [sentiment, setSentiment] = useState("");
const [subscriptionStatus, setsubscriptionStatus] = useState(false);

  const toggleForm = (id: string) => {
    setId(id);
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
<select 
  id="isAdmin" 
  className="select select-bordered w-full max-w-xs"
  value={isAdmin ? 'Admin' : 'User'}
  onChange={event => setAdmin(event.target.value === 'Admin')}>
        <option value=''>Role</option>
        <option>Admin</option>
        <option>User</option>
</select>
<select className="select select-bordered w-full max-w-xs" 
value={sentiment.toString()} 
onChange={event => setSentiment(parseInt(event.target.value) as number)
}>
  <option>Sentiment</option>
  <option>5</option>
  <option>100</option>
</select>

<select 
id="subscription"
className="select select-bordered w-full max-w-xs"
>
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

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //check the values
    console.log("here")
    console.log(id);
    console.log(name);
    console.log(email);
    console.log(isAdmin);
    console.log(sentiment);
    console.log(subscriptionStatus);
//construct the body namefrom db : name from the web 
    const body = {
      _id: id,
      name,
      email,
      isAdmin,
      sentimentLeft: sentiment,
      subscribed: subscriptionStatus,
    }
    console.log(body)
    axios.patch(`http://localhost:3000/getUsers/${id}`, body)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  };

  return (
  <>
    {showForm && (
        <form className="form-container w-1/3" onSubmit={handleUpdate}>
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
      <button htmlFor="my_modal_7" onClick={() => toggleForm(user.id)} className="btn btn-outline btn-accent">Edit</button>
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