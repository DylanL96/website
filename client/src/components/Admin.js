import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  //Get request to retrieve the data
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:3001/admin/dashboard`
    }).then(res => {
      setData(res.data)
      // console.log(res.data)
      setLoading(false)
    })
  },[])

  const renderTable = (a,b) => {
    // console.log(b)
    return (
      <tr key={b}>
        <td>{a._id}</td>
        <td>{a.username}</td>
        <td>{a.email}</td>
      </tr>
    )
  }

  return (
    <div>
      <h1>Admin Page</h1>
      {loading && <p>Its loading</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
          </thead>
          <tbody>
            {data.map(renderTable)}
          </tbody>
      </Table>
    </div>
    
  )
}

export default Admin;
