import React from 'react'
import s from './AddTodo.module.scss'
import { FaRegSquarePlus } from "react-icons/fa6"

function AddTodo({ addTodo, setTodoTitle, todoTitle}) {

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addTodo()
  };

  return (
    <div>
      <div>
        <form onSubmit={handleOnSubmit} className={s.form}>
          <label htmlFor='todoTitle' className={s.form__title}>
            Add task:
          </label>
          <input autoFocus 
            required
            id='todoTitle'
            className='field'
            type='text'
            name='todoTitle'
            maxLength={35} 
            onChange={(e) => setTodoTitle(e.target.value)} 
            value={todoTitle}
            placeholder='What needs to be done?'
          />
          <button type='submit' className='btn'>
            <FaRegSquarePlus className='btn_icon btn_icon___lg' />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo