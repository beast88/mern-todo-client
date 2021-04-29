import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Signup = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [errorMessage, setErrorMessage] = useState(false)

    useEffect(() => {
        if(password === confirmPassword && password !== ''){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [password, confirmPassword])

    const handleSubmit = () => {
        axios.post('/users/signup', {
            username: username,
            password: password
        }).then(res => {
            if(res.status === 200) {
                axios.post('/users/login', {
                    username: username,
                    password: password
                }).then(res => {
                    if(res.status === 200) {
                        const token = res.data.token
                        localStorage.setItem('token', token)

                        window.location.href = '/dashboard'
                    }
                })
            } 
        }).catch(err => {
            setErrorMessage(true)
            setUsername('')
            setPassword('')
            setConfirmPassword('')
        })
    }

    return (
        <div>
            <h2 className="mb-4 text-primary text-center">signup</h2>
            <div className="mb-4">
                <label className="font-weight-bold" >username</label>
                <input 
                    className="w-100 rounded-sm border border-info p-2" 
                    type="text" 
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="font-weight-bold">password</label>
                <input 
                    className="w-100 rounded-sm border border-info p-2" 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="font-weight-bold">confirm password</label>
                <input 
                    className="w-100 rounded-sm border border-info p-2" 
                    type="password" 
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4" >
                <div>
                    <p className="mb-0 font-weight-bolder">Already have an account? <span 
                        className="text-primary cursor"
                        onClick={props.renderLogin}
                    >
                        Login</span></p>
                </div>
                <button disabled={disabled} className={`${disabled ? "bg-secondary" : "bg-primary"} font-weight-bold py-2 px-4 text-white border-0 rounded-sm`} 
                    onClick={() => {handleSubmit()}} 
                >Create</button>
            </div>

            {/* Error message for when a username is already in use */}
            <div className={`${errorMessage ? "d-block" : "d-none"} border border-danger p-2 mb-2 rounded-sm text-danger font-weight-bolder text-center`} >
               <p className="mb-0"><i className="bi bi-exclamation-circle mr-2"></i> username already in use</p>
            </div>
        </div>
    )
}

export default Signup
