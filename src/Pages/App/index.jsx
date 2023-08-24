import { useState } from 'react'
import './App.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const CheckCircle = ({checkAction, stateCheck}) => {
  
  return (
    <span  className={`img w-[30px] h-[30px] rounded-full border-[2px] border-[var(--text-color-primary)]  ${stateCheck ? 'check-active' : 'bg-transparent'}  relative flex justify-center items-center`} onClick={checkAction || null}>
      <span className={`img w-[20px] h-[20px] rounded-full  ${stateCheck ? 'check-active-icon absolute' : 'none'} `}></span>
    </span>
  )
}

const CreateTodo = () => {
  const [todoName, setTodoName] = useState('')
  
  return (
    <div className=' flex-grow-[1] max-h-[60px]  flex items-center gap-6 p-4 box-primary rounded-xl'>
     <CheckCircle stateCheck={true}/>
      <input className='box-primary dark:placeholder:text-[--text-color-primary] outline-none' type='text' value={todoName} onChange={(e)=>{setTodoName(e.target.value)}} placeholder='Crear una nueva Tarea'/>
    </div>
  )
}
const Items = ({item, index}) => {
  return (
    <Draggable
      draggableId={item.id}
      index={index}
    >
      {
        (provided) => (
          <div className=' flex-grow-[1] max-h-[60px]  flex items-center gap-6 p-4 box-primary rounded-xl'
          {...provided.draggableProps}
          ref={provided.innerRef}
          >
            <CheckCircle stateCheck={true}/>
            <p className='box-primary'
              {...provided.dragHandleProps}
            >{item.content}</p>
          </div>

        )
      }

    </Draggable>
  )
}
const ContainerItems = ({ items}) => {
  return (
    <Droppable 
      droppableId='task-conatiner'

    >
      {
        (provided) => (
          <div className=' w-full h-[85%] box-primary rounded-xl flex flex-col'
            ref={provided.innerRef}
          >
            {items.map((item, index) => {return (
              <Items item={item} index={index}/>
            )})}
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>

  )
}
const Container= ({children}) => {
  return (
    <div className='main-container-column w-[90%] min-w-[320px] max-w-[600px] h-[75vh]  absolute flex flex-col justify-between font-bold '>
      {children}
    </div>
  )
} 

const App = () => {

  
  const initialItems = {
    items : {
      'item-1' : {id:'item-1', content: 'hacer el proyecto de todo app de frontendmentor'},
      'item-2' : {id:'item-2', content: 'crear el componente de columna'},
      'item-3' : {id:'item-3', content: 'crear el componente de tareas'},
      'item-4' : {id:'item-4', content: 'terminar el curso de react-beautiful-dnd'},

    },
    columns : {
      'column-1': {
        title : 'All',
        id : 'column-1',
        itemIds : [ 'item-1', 'item-2', 'item-3', 'item-4',]
      },
      // 'column-2': {
      //   title : 'Activate',
      //   id : 'column-1',
      //   itemsIds : [ ]
      // },
      // 'column-3': {
      //   title : 'Complete',
      //   id : 'column-1',
      //   itemsIds : [ ]
      // },      
    },
    columnOrder : [ 'column-1'] 
    
  }
  const [data, setData] =  useState(initialItems)

  const [handleMode, setHandleMode] = useState(false) 

  const handleTheme = () => {
    window.document.body.classList.toggle('dark')
    setHandleMode(!handleMode)
  }
  
  return (
    <section className="w-full min-w-[320px] relative flex flex-col items-center ">
      {/* this section are to header image, title and logo */}
      <div className={`main-bg-image ${ handleMode ? 'bg-todo-dark' : 'bg-todo-ligth ' } relative `}>
        <div className='title-and-icon-container flex justify-between '>
          <h1 className='text-[2.8rem] font-mono text-white font-bold '>TODO</h1>
          <span className={`img  ${handleMode ? ' icon-mode-dark ' : ' icon-mode-ligth '} cursor-pointer`} onClick={handleTheme}></span>
        </div>
      </div>
       {/* this section is to task ccolumn box */}
      <Container >
        <CreateTodo/>
        <DragDropContext
        
        > 
          {data.columnOrder?.map((columnId)=> {
            const column =  data.columns[columnId]
            const items =  column.itemIds?.map(itemId => data.items[itemId] )
            return (
              <ContainerItems key={columnId} items={items}/>
            )
          })}


    
        </DragDropContext>
      </Container> 



    </section>
  )
    
}

export  {App}
