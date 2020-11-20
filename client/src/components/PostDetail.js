import React, {useState, useEffect} from 'react';
import {isAuthenticated} from '../helpers/auth';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

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
    
    <Card>
      <Card.Title>{post.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{post.description}</Card.Subtitle>
      <Card.Body id="post-detail-content">
      {post.content}
      </Card.Body>
      {isAuthenticated() && isAuthenticated().role===1 && (
          <Button variant="danger" onClick={() => deletePost(post._id)}>Delete</Button>
      )}
    </Card>
    
)};
export default Post;