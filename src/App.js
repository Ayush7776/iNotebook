// import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';

import PrivateRoute from './Utils/PrivateRoute'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import React, { Fragment } from 'react';
import { AuthProvider } from './Context/AuthContex';
import ChangePassword from './Pages/ChangePassword';
import NotFound from './Pages/NotFound';
import './css/font.css'
function App() {

  return (
    <>
    <div className='ubuntu-light'>

      <Router>
        <AuthProvider>
          <Fragment>
            <Routes>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/changePassword' element={<ChangePassword />} />
              </Route>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              <Route  path='*' element={<NotFound/>} />
            </Routes>
          </Fragment>
        </AuthProvider>
      </Router>
    </div>
    </>
  );
}

export default App;
