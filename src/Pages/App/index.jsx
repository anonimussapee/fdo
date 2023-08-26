import { useState } from 'react'
import './App.css'
import { DragDropContext} from 'react-beautiful-dnd'
import { CreateTodo } from '../../Components/CreateTodo'
import { Container, ContainerItems } from '../../Components/ContainerItems'




const App = () => {

  
  let initialItems = {
    items : {
      'item-1' : {id:'item-1', content: 'hacer el proyecto de todo app de frontendmentor'},
      'item-2' : {id:'item-2', content: 'crear el componente de columna'},
      'item-3' : {id:'item-3', content: 'crear el componente de tareas'},
      'item-4' : {id:'item-4', content: 'terminar el curso de react-beautiful-dnd'},
      'item-5' : {id:'item-5', content: 'terminar el curso de react-beautiful-dnd'},

    },
    columns : {
      'column-1': {
        title : 'All',
        id : 'column-1',
        itemIds : [ ]
      },
      completed : {
        title : 'Completed',
        id : 'completedTasks',
        itemIds : []
      }

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
  
  initialItems = {
    ...initialItems,
    columns:{
      ...initialItems.columns,
      'column-1': {
        ...initialItems.columns['column-1'],
        itemIds : Object.keys(initialItems.items) || []
      }

    }
  } 

  const [data, setData] =  useState(initialItems)

  const [handleMode, setHandleMode] = useState(false) 

  const handleTheme = () => {
    window.document.body.classList.toggle('dark')
    setHandleMode(!handleMode)
  }
  
  const onDragEnd = (result) => {
    const {destination, source, draggableId} =  result

    if(!destination ) {
      return
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return 
    }

    const column =  data.columns[source.droppableId]
    const newItemIds = Array.from(column.itemIds)
    newItemIds.splice(source.index, 1)
    newItemIds.splice(destination.index, 0 , draggableId)

    const newColumn = {
      ...column,
      itemIds: newItemIds
    }
    const newState = {
      ...data,
      columns:{
        ...data.columns,
        [source.droppableId] :newColumn
      }
    }

    setData(newState)
  }
  const clearAction = () =>{
    setData({
      ...data,
      items:{},
      columns: {
        ...data.columns,
        'column-1': {
          ...data.columns['column-1'],
          itemIds : []
        }
      }
    })
  } 

  const allItems =  (data.columns['column-1'].itemIds).length
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
         onDragEnd={onDragEnd}
        > 
          {data.columnOrder?.map((columnId)=> {
            const column =  data.columns[columnId]
            const items =  column.itemIds?.map(itemId => data?.items[itemId] )
            return (
              <ContainerItems key={column.id} items={items}  column={column}  allItems={allItems} clearAction={clearAction}/>
            )
          })}

        </DragDropContext>
      </Container> 
      <p className='text-[--Very-Light-Gray] absolute bottom-8 font-extrabold'> Arrastra y suelta para priorizar tareas</p>


    </section>
  )
    
}

export  {App}
