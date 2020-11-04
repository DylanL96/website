import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <BrowserRouter>
  <Header/>
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/Signup' component={Signup}/>
      <Route exact path='/Signin' component={Signin}/>
    </Switch>
    
  </main>
  </BrowserRouter>
)

export default App;
