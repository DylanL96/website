import React, {useState, useEffect} from 'react';
import {isAuthenticated} from '../helpers/auth';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const Post = ({match}) => {
  //Obtains the userName from localStorage
  const [post, setPost] = useState([]); 
  const [delPost, setDelPost] = useState([]);
  let history = useHistory();

  //Delete post
  const deletePost = id => {
    axios.delete(`http://localhost:3001/admin/posts/${id}`)
      .then(result => {
        // setMessage({successMsg: result.data.successMessage})
        setDelPost(delPost.filter(element => element._id !==id))
        history.push('/')
    }
  )};
  
  //Update post
  const updatePost = id => {
    axios.put(`http://localhost:3001/admin/posts/${id}`, {
      post: post
    })
  }

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
      <Card.Body>
      {post.content}
      </Card.Body>
    </Card.Body>
  </Card>
 
  
)}
export default Post;