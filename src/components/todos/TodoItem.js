import React from 'react'
import axios from 'axios'

const TodoItem = (props) => {

  const markCompleted = (todo) => {
    axios.put(`/todo/${todo._id}`, {},  
    {headers: {token: localStorage.getItem('token')}})
      .then(res => {
        if(res.status === 200){
          props.updateTodoList(res.data.todo)
        }
      })
  }

  return(
    <div className="d-flex align-items-center justify-content-between my-2 w-100 border border-secondary p-2 rounded-sm">
      <p className="mb-0 font-weight-bolder">{props.todo.title}</p>
      <input 
        type="checkbox"
        onClick={() => markCompleted(props.todo)} 
      />
    </div>
  )
}

export default TodoItem
