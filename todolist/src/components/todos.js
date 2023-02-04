import React, { useContext, useState, useEffect } from 'react'
import Todoitem from './todoitem'
import Addt from './addtodo'
import CredContext from '../context/Credentials/credContext'


const Todos = () => {
    const credentials = useContext(CredContext);

    const [todos, setTodos] = useState([]);


    useEffect(() => {
        console.log('inside useEffect of todos')
        fetch('/initial', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                Authorization: `Basic ${credentials.user}`
            },
        })
            .then(response => response.json())
            .then(todos => { console.log(todos, 'from useEffect on rendering homepage'); setTodos(todos) })
    }, [])

    async function updatedb(newTodos) {
        console.log('updatedb is running!')
        let res = await fetch('/todos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newTodos: newTodos, name: credentials.user })
        })
        let data = await res.json()
        if (!data) {
            console.log("Couldnt fetch data from todos route")
        }
    }
    async function deletedb(newTodos) {
        console.log('deletedb is running!')
        let res = await fetch('/deletetodo', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newTodos: newTodos, name: credentials.user })
        })
        let data = await res.json()
        if (!data) {
            console.log("Couldnt fetch data from todos route")
        }
    }




    const addfunc = (title, des) => {
        let sno;
        if (todos.length === 0) {
            sno = 1;
        } else {
            sno = todos[todos.length - 1].sno + 1;

        }
        let newTodo = {
            sno: sno,
            title: title,
            desc: des
        };
        if (todos) {
            setTodos((todos) => {
                return [...todos, newTodo]
            })
        }
        else {
            setTodos([newTodo])
        }
        updatedb(newTodo);
    }


    const ondelete = (todo) => {
        // Deleting in this way in react does not work:
        // let index = todos.indexOf(todo)
        // todos.splice(index,1)

        setTodos(
            todos.filter((item) => {
                return item !== todo
            })
        )
        deletedb(todo);
    }

    return (
        <>
            <div className="container" >
                <h1>Todo List</h1>
                <Addt addfunc={addfunc} />
                <div className="todocontainer">
                    {todos.map((todo) => {
                        return <Todoitem todo={todo} key={todo.sno} ondelete={ondelete} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Todos
