import { Outlet,Navigate } from 'react-router-dom'
import AuthContext from '../Context/AuthContex';
import { useContext } from 'react';

const PrivateRoute = () => {
    let {user}=useContext(AuthContext)
    // const authenticated = false; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;