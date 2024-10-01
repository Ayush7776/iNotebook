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

function App() {
  return (
    <>

      <Router>
        <AuthProvider>
          <Fragment>
            <Routes>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/' element={<Home />} />
              </Route>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
            </Routes>
          </Fragment>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
