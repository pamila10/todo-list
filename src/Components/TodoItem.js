import React, { useState } from 'react'
import s from './TodoItem.module.scss'

function TodoItem({ 
  id, item,
  todoTitle, handleUpdate,
  deleteTodo, updateTodo, 
  toggleDone
}) {

  const [todoIsEditing, setTodoIsEditing] = useState(false)

  const activateEditMode = () => {
    setTodoIsEditing(true)
  }

  const deactivateEditMode = () => {
    setTodoIsEditing(false)
    updateTodo(id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const viewTemplate = (
    <>
      <div className={s.form__fieldBl}>
        <div className={s.form__fieldWrap}>
          <input
            type='checkbox'
            checked={item.completed}
            onChange={(e) => {
              toggleDone(item)
            }}
          />
          <p>{item?.title}</p>
        </div>
        <div className={s.form__fieldWrap}>
          <button className='btn'
            onClick={(e) => {
              activateEditMode()
            }}>Edit</button>
          <button title='Delete Task' 
            className='btn'
            onClick={() => {
              deleteTodo(id)
            }}>
            X
          </button>
        </div>
      </div>
    </>
  )

  const editTemplate = (
    <div className={s.form__fieldBl}>
      <input autoFocus 
        id='todoTitle'
        type='text'
        name='todoTitle'
        maxLength={35} 
        value={todoTitle}
        onChange={handleUpdate}
      />
      <button className='btn'
        title='Edit Task' 
        onClick={() => {
          deactivateEditMode(id)
        }}
      >
        Save
      </button>
    </div>
  )
  

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      {todoIsEditing ? editTemplate : viewTemplate}
    </form>
  )

}

export default TodoItem