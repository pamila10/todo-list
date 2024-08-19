import React from 'react'
import TodoItem from './TodoItem';

function TodoList({ 
  todo, todoTitle, 
  handleUpdate, loading,
  deleteTodo, updateTodo, 
  toggleDone, todoIsEditing, 
  setTodoIsEditing
}) {

  if (todo == null) {
    return (
      <div className='loader'>
        <div className='loader__spinner'></div>
      </div>
    )
  }

  return (
    <div>
      {loading ? (
          <div className='loader'>
            <div className='loader__spinner'></div>
          </div>
        ) : (
          <>
          {todo.length ? (
            <>
              {todo.map((item) => {
                return (
                  <TodoItem key={item.id} 
                  id={item.id} item={item}
                  toggleDone={toggleDone}
                  todoTitle={todoTitle}
                  handleUpdate={handleUpdate}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                  todoIsEditing={todoIsEditing}
                  setTodoIsEditing={setTodoIsEditing}></TodoItem>
                )
              })}
            </>
          ) : (
              <p>
                No todo to display.
              </p>
            )}
          </>
      )}
    </div>
  );
}

export default TodoList