import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import ReactPaginate from 'react-paginate'
import './App.scss'
import AddTodo from './Components/AddTodo'
import TodoList from './Components/TodoList'
import API from './Api/Api'

function App() {
  const value = localStorage.getItem('todolist')

  const [todo, setTodo] = useState()
  const [loading, setLoading] = useState(true)
  const [todoText, setTodoText] = useState('')
  const [todoTitle, setTodoTitle] = useState('')
  const [pageCount, setpageCount] = useState(0)

  let totalLimit = 50
  let pageLimit = 10

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todo))
  }, [todo])

  useEffect(() => {
    API.get(`todos?_page=1&_limit={pageLimit}`).then((data) => {
      setLoading(false)
      setpageCount(Math.ceil(totalLimit / pageLimit));
      setTodo(data?.data)

      if(value) {
        setTodo(JSON.parse(value))
      }
    })
    .catch((err) => {
      setLoading(false)
      console.log(err)
      console.log(`Error: ${err.message}`)
    })
    // eslint-disable-next-line
  }, [])

  const fetchNewTodo = (currentPage) => {
    API.get(
      `todos?_page=${currentPage}&_limit={pageLimit}`
    ).then((data) => {
      setTodo(data?.data)
    })
  };

  const handleClick = (data) => {
    let currentPage = data.selected + 1;
    const newTodoList = fetchNewTodo(currentPage);
    setTodo(newTodoList);
  };

  const handleChange = (e) => {
    e.preventDefault()
    setTodoText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = nanoid()
    const newTodo = { completed: false, id : id, title: todoText, userId: id }

    if(!newTodo) {
      return false
    }
    setTodoText('')

    API
      .post('todos', { ...newTodo })
      .then((res) => {
        setTodo([res.data, ...todo])
      })
      .catch((err) => {
        console.log(err);
        console.log(`Error: ${err.message}`)
      })
  }

  const handleUpdate = (e) => {
    const value = e.target.value;
    setTodoTitle(value)
  }

  const updateTodo = (id) => {
    const todoItem = todo.find(item => item.id === id)

    API
      .put(`todos/${id}`, {  
        userId: todoItem.userId,
        id: todoItem.id,
        title: todoTitle,
        completed: todoItem.completed,
       })
      .then((res) => {
        const updatedList = todo.map((elem => {
          if (elem.id === res.data.id) {
            elem = res.data
          }
          return elem
        }))
        setTodo(updatedList)
      })
  }


  const deleteTodo = (id) => {
    API
      .delete(`/todos/${id}`).then((res) => {
        const newTodoList = todo.filter(item => item.id !== id)
        setTodo(newTodoList)
      })
      .catch((err) => {
        console.log(err)
        console.log(`Error: ${err.message}`)
      })
  }

  const toggleDone = (item) => {

    const updatedList = todo.map((elem => {
      if (item.id === elem.id) {
        item.completed = !item.completed
      }
      return elem
    }))

    setTodo(updatedList)
  }

  return (
    <div className="App">
      <header>
        <div className="container">
          <h1>Todo List</h1>
        </div>
      </header>
      <div className="container">
        <section className="section">
            <AddTodo 
              todo={todo} 
              setTodo={setTodo}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
        </section>
        <section className="section">
            <TodoList 
              todo={todo}
              setTodo={setTodo}
              loading={loading} 
              toggleDone={toggleDone}
              handleUpdate={handleUpdate}
              todoTitle={todoTitle}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          </section>
          <section className="section">
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handleClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </section>
        </div>
    </div>
  )
}

export default App
