import React, { useState, useEffect } from 'react'
import Navbar from '../components/global/Navbar'
import TodoForm from '../components/todos/TodoForm'
import TodoItem from '../components/todos/TodoItem'
import CompletedItems from '../components/todos/CompletedItems'
import axios from 'axios'

const Dashboard = (props) => {
  const [username, setUsername] = useState('')
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [completedSelected, setCompletedSelected] = useState(false)

  useEffect(() => {
    axios.get('/users/user',
    {headers: 
      {token: localStorage.getItem('token')}
    })
      .then(res => setUsername(res.data.user.username))
  }, [])

  useEffect(() => {
    axios.get('/todo',
    {headers:
      {token: localStorage.getItem('token')}
    })
      .then(res => {
        setTodos(res.data.todos)
        setCompletedTodos(res.data.todos.filter(todo => todo.completed))
      })
  }, [])

  const addTodo = (newItem) => {
    setTodos(prevState => [...prevState, newItem])
  }

  const updateTodoList = (oldTodo) => {
    setTodos((prevState) => {
      return prevState.filter(todo => todo._id !== oldTodo._id)
    })
    setCompletedTodos(prevState => [...prevState, oldTodo])
  }

  const updateCompletedList = (deletedItem) => {
    setCompletedTodos((prevState) => {
      return prevState.filter(todo => todo._id !== deletedItem._id)
    })
  }

  return(
    <div className="" >
      <Navbar />
      <div className="p-3 d-flex flex-column align-items-center customheight">
        <p className="mb-0">Welcome <span className="text-primary font-weight-bolder">{username}</span>, here is your to do list</p>
        <TodoForm addTodo={addTodo} />

        <div className="card customwidth">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <p className={`nav-link ${!completedSelected ? "active" : "cursor"}`}
                onClick={() => {setCompletedSelected(false)}}
              >ToDo</p>
              </li>
              <li className="nav-item">
                <p className={`nav-link ${completedSelected ? "active" : "cursor"}`}
                onClick={() => {setCompletedSelected(true)}}
              >Completed</p>
              </li>
            </ul>
          </div>
          <div className="card-body">
            { 
              !completedSelected
              ?  todos.filter(todo => !todo.completed).map((todo) => {
                return <TodoItem todo={todo} updateTodoList={updateTodoList} key={todo._id} />
                })
              :
                completedTodos.map((todo) => {
                  return <CompletedItems todo={todo} updateCompletedList={updateCompletedList} key={todo._id} />
                })              
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard