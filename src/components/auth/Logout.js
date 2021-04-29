import React from 'react'

const Logout = () => {
  const handleClick = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  
  return(
    <p className="cursor mb-0" onClick={() => handleClick()}>Logout</p>
  )
}

export default Logout