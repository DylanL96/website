import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Admin from './components/Admin';
import AdminRoute from './components/AdminRoute';
import User from './components/User';
import UserRoute from './components/UserRoute';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <BrowserRouter>
  <Header/>
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/signin' component={Signin}/>
      <Route exact path='/posts/:id' component={PostDetail}/>
      <AdminRoute exact path='/admin' component={Admin}/>
      <AdminRoute exact path='/admin/create' component={CreatePost}/>
      <UserRoute exact path='/user' component={User}/>
    </Switch>
    
  </main>
  </BrowserRouter>
)

export default App;
