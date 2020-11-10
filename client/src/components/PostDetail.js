import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {isAuthenticated} from '../helpers/auth';
import Card from 'react-bootstrap/Card';

const Post = ({match}) => {
  // console.log(match)
  const [post, setPost] = useState([]); 
  const [delPost, setDelPost] = useState([]);

  //Delete post
  const deletePost = id => {
    axios.delete(`http://localhost:3001/admin/posts/${id}`)
      .then(result => {
        alert(`Deleted ${id}`)
        console.log(result)
        setDelPost(delPost.filter(element => element._id !==id))
    }
  )}

  //Get all of the posts
  useEffect(() => {
    axios.get(`http://localhost:3001/admin/posts/${match.params.id}`)
      .then(result => {
        // console.log(result.data)
        setPost(result.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [match.params.id])

  return (

    <Card style={{ width: '180rem' }}>
    <Card.Body>
    {isAuthenticated() && isAuthenticated().role===1 && (
        <button onClick={() => deletePost(post._id)}>Delete</button>
      )}
      <Card.Title>{post.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{post.description}</Card.Subtitle>
      <Card.Text>
      {post.content}
      </Card.Text>
      <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
  </Card>
 
  
)}
export default Post;