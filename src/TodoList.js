import React from 'react'
import './App.scss';
export const TodoList = ({left}) => {
  return (
    <div  id='todoContainer'>
       <div className='itemLeft'>
        <p className='numLeft'>{left}</p>
       </div>
       
       <div>
        <p className='clearCompleted'> Clear All Todo</p>
       </div>
    </div>
  )
}
