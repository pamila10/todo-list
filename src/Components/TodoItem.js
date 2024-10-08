import React, { useState } from 'react'
import s from './TodoItem.module.scss'
import { FaPen, FaTrash, FaSave } from "react-icons/fa"

function TodoItem({ 
  item, deleteTodo, updateTodo, todo, setTodo
}) {

  const [todoIsEditing, setTodoIsEditing] = useState(false)

  let id = item.id
  const toggleDone = (item) => {

    const updatedList = todo.map((elem => {
      if (item.id === elem.id) {
        item.completed = !item.completed
      }
      return elem
    }))

    setTodo(updatedList)
  }

  const handleUpdate = (id, key, value) => {
    setTodo((values) => {
      return values.map((item) => {
          return item.id === id ? { ...item, [key]: value } : item
        }
      );
    });
  }

  const activateEditMode = () => {
    setTodoIsEditing(true)
  }

  const deactivateEditMode = () => {
    setTodoIsEditing(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    deactivateEditMode(id)
    updateTodo(id)
  }

  const viewTemplate = (
    <>
      <div className={s.form_fieldBl}>
        <div className={s.form_fieldWrap}>
          <input
            className='checkbox'
            type='checkbox'
            checked={item.completed}
            onChange={(e) => {
              toggleDone(item)
            }}
          />
          <p className='text'>{item?.title}</p>
        </div>
        <div className={s.form_fieldWrap}>
          <button className='btn'
            onClick={() => {
              activateEditMode()
            }}><FaPen className='btn_icon'/></button>
          <button title='Delete Task' 
            className='btn'
            onClick={(e) => {
              e.preventDefault()
              deleteTodo(id)
            }}>
            <FaTrash className='btn_icon'/>
          </button>
        </div>
      </div>
    </>
  )

  const editTemplate = (
    <form onSubmit={handleSubmit} className={s.form} onBlur={deactivateEditMode}>
      <div className={s.form_fieldBl}>
        <input autoFocus 
          id='todoTitle'
          type='text'
          name='todoTitle'
          maxLength={100} 
          value={item.title}
          onChange={(e) => handleUpdate(id, "title", e.target.value)}
        />
        <button className='btn'>
          <FaSave className='btn_icon'/>
        </button>
      </div>
    </form>
  )
  

  return (
    <div>
      {todoIsEditing ? editTemplate : viewTemplate}
    </div>
  )

}

export default TodoItem