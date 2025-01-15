import { useState} from 'react'
// import List from "./List"

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState("");

    const handleAddTodo = (e)=> {
        e.preventDefault();
        if(value.trim() === "") return;
        console.log(value);
        
        setTodos((state)=> [...state, {id: Date.now(), text: value.trim(), edit: false, complete: false}])
        setValue("")
    }



    const handleDelete = (id)=> {
        setTodos(prev => prev.filter((item) => {
            return item.id !== id
        }))
    }

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <div className="mb-3">
            <label htmlFor="text" className="form-label">Write Something</label>
            <input type="text" className="form-control" id="text" aria-describedby="emailHelp" value={value} onChange={(e)=> setValue(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Todo</button>
        </form>

        {/* Show todo List */}
        <List todos={todos} onDelete={handleDelete} setTodos={setTodos} />
    </div>
  )
}



const List = ({todos, onDelete, setTodos})=> {


    const handleToggleComplete = (id)=> {
        setTodos((prev)=> {
            return prev.map(item => item.id === id ? {...item, complete: !item.complete} : item)
        })
    }

    const handleEdit = (id)=> {
        setTodos((prev)=> {
            return prev.map(item => item.id === id ? {...item, edit: !item.edit} : item)
        })
    }

    const handleOnUpdate = (id, newText)=> {
        setTodos((prev)=> {
            return prev.map(item => item.id === id ? {...item, text: newText} : item)
        })
    }

    return (
        <div className='py-4'>
            <ul>
                {todos.map(({text, id, edit, complete})=> {
                    return <li key={id} className='my-2 d-flex gap-4 align-items-center'>
                                <input type="checkbox" onChange={()=> handleToggleComplete(id)} />
                                {edit ? <input type="text" value={text} onChange={(e) => handleOnUpdate(id, e.target.value)} /> : <span className='span-text'>
                                    {complete? <del className={`${complete && "blur"}`}>{text}</del> : <b >{text}</b>}</span>}
                                <button className={`btn  ${complete ? "btn-primary my_disabled" : "btn-info" }`} onClick={()=> handleEdit(id)}>
                                    {edit ? "Update" : "Edit"}
                                </button>
                                <button type='button' className='btn btn-danger' onClick={()=>  onDelete(id)} title={id}>Delete</button>
                            </li>
                })}
                
            </ul>
        </div>
    )
}

export default Todo
