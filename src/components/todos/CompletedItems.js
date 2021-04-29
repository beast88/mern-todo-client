import React from 'react'
import axios from 'axios'

const CompletedItems = (props) => {

  const handleDelete = (todo) => {
    axios.delete(`/todo/${todo._id}`,
      {headers: {token: localStorage.getItem('token')}})
        .then(res => {
          props.updateCompletedList(res.data.todo)
        })
  }

  return(
    <div className="d-flex align-items-center justify-content-between my-2 w-100 border border-secondary p-2 rounded-sm">
      <p className="mb-0 text-secondary"><s>{props.todo.title}</s></p>
      <i className="bi bi-trash-fill cursor text-primary" onClick={() => {handleDelete(props.todo)}} ></i>
    </div>
  )
}

export default CompletedItems
