import { useState } from 'react'
import { CheckCircle } from '../CheckCircle'

const CreateTodo = () => {
  const [todoName, setTodoName] = useState('')
  
  return (
    <div className=' flex-grow-[1] max-h-[55px]  flex items-center gap-6 p-4 box-primary rounded-xl'>
     <CheckCircle stateCheck={true}/>
      <input className='box-primary dark:placeholder:text-[--text-color-primary] outline-none flex-grow-[1]' name='todo-creator'  id='todo-creator' type='text' value={todoName} onChange={(e)=>{setTodoName(e.target.value)}} placeholder='Crear una nueva Tarea'/>
    </div>
  )
}

export {CreateTodo}