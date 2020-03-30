import React from 'react';
import "./App.css";


import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';

import {Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar'

function App() {
  return( 
    <>
    <Navbar/>
    {/* Switch: if a path is not correct, switch will render the route that doesn't have a path */}
    <Switch> 
      <Route exact path="/" component={Home} />
      <Route exact path="/rooms/" component={Rooms} />
      <Route exact path="/rooms/:slug" component={SingleRoom} />
      <Route component={Error} />
    </Switch>
    </>
   
  ); 
}

export default App;
