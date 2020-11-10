import React from 'react';
import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import isEmpty from 'validator/lib/isEmpty';
import {showErrorMsg, showSuccessMsg} from '../helpers/message';
import {showLoading} from '../helpers/loading';
import {postDataForm} from '../api/post';

const CreatePost = () => {

  //Setting the post data states
  const [postData, setPostData] = useState({
    title: 'Test Title 1',
    description: 'Test Description 1',
    content: 'Test Content 1',
    successMsg: false,
    errorMsg: false,
    loading: false
  })

  //Destucturing to get easier access to the variables
  const {title, description, content, successMsg, errorMsg, loading} = postData;

  const handleChange = event => {
    setPostData({
      ...postData,
      [event.target.name] : event.target.value,
      successMsg: '',
      errorMsg: ''
    })
  };

  //Sending the form data
  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted!')
    if(isEmpty(title) || isEmpty(description) || isEmpty(content)){
      setPostData({
        ...postData,
        errorMsg: `All fields are required`
      })
    } else {
      const {title, description, content} = postData;

      const data = {title, description, content};

      setPostData({...postData, loading: true});
      console.log(`Post submitted data:`, postData);

      //Sending the data object we destructured to the signup axios POST request
      postDataForm(data)
        .then((response => {
          setPostData({
            title: '',
            description: '',
            content: '',
            loading: false,
            successMsg: response.data.successMessage
          })
        }))
        .catch((error => {
          console.log(`Axios post form data error: ${error}`);
          setPostData({...postData, loading: false})
        }))

  
    }
  }

  const showCreatePostForm = () => (
    <Form className="mt-3 ml-3" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <input name='title' className='form-control' value={title} placeholder='Enter title' type='text' onChange={handleChange}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <input name='description' className='form-control' value={description} placeholder='Enter description' type='text' onChange={handleChange}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicContent">
        <Form.Label>Content</Form.Label>
        <textarea name='content' className='form-control' value={content} placeholder='Enter content' type='text' onChange={handleChange}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
  return (
   <div>
     <div>{successMsg && showSuccessMsg(successMsg)}</div>
     <div>{loading && showLoading(loading)}</div>
     <div>{errorMsg && showErrorMsg(errorMsg)}</div>
     <div>{showCreatePostForm()}</div>
     {/* {JSON.stringify(postData)} */}
   </div>
  )
};

export default CreatePost;