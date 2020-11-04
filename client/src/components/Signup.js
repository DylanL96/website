import {React, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {showErrorMsg} from '../helpers/message';
import {signup} from '../api/auth';

const Signup = () => {

  //Setting the initial formData. All of their information will be stored into the component state at once.
  const [formData, setFormData] = useState({
    username: 'Dylan',
    email: 'dlaw96@hotmail.com',
    password: '123123',
    password2: '123123',
    successMsg: false,
    errorMsg: false,
    loading: false
  });

  //Destructuring the formData above. We do this to make it easier to use later.
  const {username, email, password, password2, successMsg, errorMsg, loading} = formData;

  //Event Handler. We are using the ... spread operator because it copies all of the items in the array and allows us to change all of the values of the input at once.
  //We have successMsg: '' and errorMsg: '' to get rid of any messages ONCE the user starts typping
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      successMsg: '',
      errorMsg: ''
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted')

    //Using validators to check the form submission
    if (isEmpty(email) || isEmpty(email) || isEmpty(email) || isEmpty(email)){
      setFormData({
        ...formData,
        errorMsg: 'All fields are required'
      })
    } else if (!isEmail(email)){
      setFormData({
        ...formData,
        errorMsg: 'Invalid email'
      })
    } else if (!equals(password, password2)){
      setFormData({
        ...formData,
        errorMsg: 'Passwords do not match'
      })
    } else {
      //Once user passes the client side validation, we will destructure these data from the formData.
      const {username, email, password} = formData;
      const data = {username, email, password}; //Store the objects into variable called data

      //Setting the form data and creating a new iterable copy of the array using spread operator.
      setFormData({...formData, loading:true})
      console.log(data)

      signup(data)
        .then((response => {
          setFormData({
            username:'',
            email: '',
            password: '',
            password2: '',
            loading: false,
          })
        }))
        .catch((err) => {
          console.log(`Axios sign up error: ${err}`);
          setFormData({...formData, loading: false})
        })
    }
  };

  //Value attribute is taking the destructured property, for example username and inputting it into the input field. So in this example, it will display Dylan automatically.
  const showSignupForm = () => (
    <Form className="mt-3 ml-3" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <input name='username' value={username} className='form-control' placeholder='Enter your username' type='text' onChange={handleChange}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <input name='email' value={email} className='form-control' placeholder='Enter your email' type='text' onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <input name='password' value={password} className='form-control' placeholder='Enter your password' type='text' onChange={handleChange}/>
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <input name='password2' value={password2} className='form-control' placeholder='Re-enter your password' type='text' onChange={handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )

  return (
    <div>
      {errorMsg && showErrorMsg(errorMsg)}
      {showSignupForm()}
      {JSON.stringify(formData)}
    </div>
  )
}

export default Signup