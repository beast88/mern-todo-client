import React, { useState } from 'react'
import Signup from '../components/auth/Signup'
import Login from '../components/auth/Login'

function Landing() {
  const [isSignup, setIsSignup] = useState(false)

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="customwidth min-h-75 border rounded-lg shadow">
        <div className="p-4 pt-5 min-h-100">
          {isSignup ? <Signup renderLogin={() => setIsSignup(false)} /> : <Login renderSignup={() => setIsSignup(true)}/>}
        </div>
      </div>
    </div>
  );
}

export default Landing;
