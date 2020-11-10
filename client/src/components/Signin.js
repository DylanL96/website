import {React, useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {showErrorMsg} from '../helpers/message';
import {signin} from '../api/auth';
import {showLoading} from '../helpers/loading';
import {setAuthentication, isAuthenticated} from '../helpers/auth';
import {useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Signin = () => {
  //Instantiate the history hook
  let history = useHistory();

  //This function will not allow any registered user to go to the signin or signup page when they are authenticated.
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1){
      history.push('/admin')
    } else if (isAuthenticated() && isAuthenticated().role === 0){
      history.push('/user');
    }
  }, [history])

  //Setting the initial formData. All of their information will be stored into the component state at once.
  const [formData, setFormData] = useState({
    email: 'dlaw96@hotmail.com',
    password: '123123',
    errorMsg: false,
    loading: false
  });

  //Destructuring the formData above. We do this to make it easier to use later.
  const {email, password, errorMsg, loading} = formData;

  //Event Handler. We are using the ... spread operator because it copies all of the items in the array and allows us to change all of the values of the input at once.
  //We have successMsg: '' and errorMsg: '' to get rid of any messages ONCE the user starts typing
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      errorMsg: ''
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    console.log('Sign in form submitted')

    //Using validators to check the form submission
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: 'All fields are required'
      })
    } else if (!isEmail(email)){
      setFormData({
        ...formData,
        errorMsg: 'Invalid email'
      })
    } else {
      //Once user passes the client side validation, we will destructure these data from the formData.
      const {email, password} = formData;
      const data = {email, password}; //Store the objects into variable called data

      //Setting the form data and creating a new iterable copy of the array using spread operator.
      setFormData({...formData, loading: true})
      console.log(`the sign in form data:`, data)

      //Sending the data object we destructured to the signin axios POST request
      signin(data)
        .then(response => {
          //Setting the localStorage and Cookie
          setAuthentication(response.data.token, response.data.user);

          //We can chain role property to isAuthenticated() bc when we created isAuthenticated, we are returning getLocalStorage which is returning the user object, so we have access to it.
          if (isAuthenticated() && isAuthenticated().role === 1){
            // console.log(`Redirect to Admin Dashboard`);
            history.push('/admin')
          } else {
            console.log(`Redirect to User dashboard`);
            history.push('/user');
          }
        })
        .catch(err => {
          setFormData({...formData, loading: false, errorMsg: err.response.data.errorMessage})
        });

    }
  };

  //Value attribute is taking the destructured property, for example username and inputting it into the input field. So in this example, it will display Dylan automatically.
  const showSigninForm = () => (
    <Form className="mt-3 ml-3" onSubmit={handleSubmit}>

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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )

  return (
    <div>
      <div>{loading && showLoading()}</div>
      <div>{errorMsg && showErrorMsg(errorMsg)}</div>
      {showSigninForm()}
      <div className="ml-3">{JSON.stringify(formData)}</div>
    </div>
  )
}

export default Signin