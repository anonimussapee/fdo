import { useState } from 'react'
import './App.css'
import { DragDropContext} from 'react-beautiful-dnd'
import { CreateTodo } from '../../Components/CreateTodo'
import { Container, ContainerItems } from '../../Components/ContainerItems'




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
    <section className="w-full min-w-[320px] h-full  flex flex-col items-center ">
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
      <p className='text-[--Very-Light-Gray] absolute bottom-8 font-extrabold'> Arrastra y suelta para priorizar tareas</p>


    </section>
  )
    
}

export  {App}
