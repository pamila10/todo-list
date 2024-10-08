import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ 
  todo, loading, deleteTodo, updateTodo, setTodo
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
            <div className='loader_spinner'></div>
          </div>
        ) : (
          <>
          {todo.length ? (
            <>
              {todo.map((item) => {
                return (
                  <TodoItem
                    item={item}
                    todo={todo}
                    setTodo={setTodo}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                  ></TodoItem>
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