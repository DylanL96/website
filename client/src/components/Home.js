import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Card, Button} from 'react-bootstrap'

const Home = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:3001/admin/posts`
    }).then(res => {
      setPost(res.data)
      // console.log(res.data)
    })
  },[])
  return (
    <div>
      {post.map(posts=>
      <Card style={{ width: '18rem' }} key={posts._id}>
      <Card.Body>
      <Card.Title>{posts.title}</Card.Title>
        <Card.Text>
          {posts.description}
        </Card.Text>
        <Button variant="primary" href={`/posts/${posts._id}`}>Click to read more</Button>
      </Card.Body>
      </Card>)}
    </div>
  )
}


export default Home