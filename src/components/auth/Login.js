import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)

    const handleSubmit = () => {
        axios.post('/users/login', {
            username: username,
            password: password
        }).then(res => {
            //Save the token to local storage if successful
            if(res.status === 200) {
                const token = res.data.token
                localStorage.setItem('token', token)

                //redirect to dashboard
                window.location.href = '/dashboard'
            }
        }).catch(err => {
            setErrorMessage(true)
            setUsername('')
            setPassword('')
        })
    }

    return (
        <div>
            <h2 className="mb-4 text-primary text-center">login</h2>
            <div className="mb-4">
                <label className="font-weight-bold" >username</label>
                <input 
                    className="w-100 rounded-sm border border-info p-2" 
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="font-weight-bold">password</label>
                <input 
                    className="w-100 rounded-sm border border-info p-2" 
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4" >
                <div>
                    <p className="mb-0 font-weight-bolder">New User? <span 
                        className="text-primary cursor"
                        onClick={props.renderSignup}
                    >Signup</span></p>
                </div>
                <button className="font-weight-bold py-2 px-4 bg-primary text-white border-0 rounded-sm"
                onClick={() => {handleSubmit()}}
                >Login</button>
            </div>

            <div className={`${errorMessage ? "d-block" : "d-none"} border border-danger p-2 mb-2 rounded-sm text-danger font-weight-bolder text-center`} >
               <p className="mb-0"><i className="bi bi-exclamation-circle mr-2"></i> invalid username/password</p>
            </div>
        </div>
    )
}

export default Login