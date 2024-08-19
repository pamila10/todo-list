import React, { useRef } from 'react'
import s from './AddTodo.module.scss'

function AddTodo({ handleSubmit, handleChange, todoText }) {

  const inputRef = useRef(null)

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className={s.form}>
          <label htmlFor='todoTitle'>
            Add task:
          </label>
          <input autoFocus 
            required
            id='todoTitle'
            type='text'
            name='todoTitle'
            maxLength={35} 
            onChange={handleChange} 
            value={todoText}
            placeholder='What needs to be done?'
          />
          <button variant='contained' type='submit' className='btn'
            onClick={() => inputRef.current ? inputRef.current.focus() : false}
          >Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo