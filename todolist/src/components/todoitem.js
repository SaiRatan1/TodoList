import React from 'react'

const todo = (props) => {
  return (
    <div className='todo'>
        <h3>{props.todo.title}</h3>
        <p>{props.todo.desc}</p>
        <button className='delbutton' onClick={()=>{props.ondelete(props.todo)}}>Delete</button>
    </div>
  )
}

export default todo
