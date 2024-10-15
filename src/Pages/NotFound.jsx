import React from 'react'
import '../css/404.css'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div>
      <div className="bg-404">
        <div className="error-content">
          <div className="error-code">404</div>
          <div className="error-message">Oops! Page not found.</div>
          <p className="lead">It looks like nothing was found at this location. You can go back to the homepage.</p>
          <Link to="/" className="btn btn-primary home-btn">Go to Homepage</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
