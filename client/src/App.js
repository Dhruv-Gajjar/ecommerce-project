import React,{useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [username, setUserName] = useState("")

  const fetchUsers = () => {
    axios.get('http://localhost:5000/users')
    .then((response) => setUsers(response.data))
  }

  const createUsers = () => {
    axios.post('http://localhost:5000/users',{name,age,username})
    .then((response) => alert('USER CREATED'))
  }

  useEffect(() => {
    fetchUsers()
  },[])

  return (
    <div>
      {users.map((user) => {
        return <div key={user._id}>
            <h1>{user.name}</h1>
            <h3>{user.age}</h3>
            <h3>{user.username}</h3>
          </div>
      })}

      <div>
        <input type='text' placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='number' placeholder='Age..' value={age} onChange={(e) => setAge(e.target.value)} />
        <input type='text' placeholder='Username...' value={username} onChange={(e) => setUserName(e.target.value)} />
        <button onClick={createUsers}>Submit</button>
      </div>
    </div>
  )
}

export default App;