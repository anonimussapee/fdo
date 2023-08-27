import { useState } from 'react'
import './App.css'
import { DragDropContext} from 'react-beautiful-dnd'
import { CreateTodo } from '../../Components/CreateTodo'
import { Container, ContainerItems } from '../../Components/ContainerItems'




const App = () => {

  
  let initialItems = {
    items : {

    },
    columns : {
      'column-1': {
        title : 'All',
        id : 'column-1',
        itemIds : []
      },
      'column-2': {
        title : 'Activate',
        id : 'column-2',
        itemIds : [ ]
      },
      'column-3': {
        title : 'Complete',
        id : 'column-3',
        itemIds : [ ]
      },      
    },
    columnOrder : [ 'column-1'],
    view: {
      all: true,
      active: false,
      completed: false,
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
  const allItems = data.view.all === true ?  Object.keys(data.items).length : data.view.active === true ?  ((Object.values(data.items)).map(item=>!item.complete)).length : (Object.values(data.items).map(item=>item.complete===true)).length


  return (
    <section className="w-full min-w-[320px] h-[100vh] flex flex-col items-center ">
      {/* this section are to header image, title and logo */}
      <div className={`main-bg-image ${ handleMode ? 'bg-todo-dark' : 'bg-todo-ligth ' } relative `}>
        <div className='title-and-icon-container flex justify-between '>
          <h1 className='text-[2.8rem] font-mono text-white font-bold '>TODO</h1>
          <span className={`img  ${handleMode ? ' icon-mode-dark ' : ' icon-mode-ligth '} cursor-pointer`} onClick={handleTheme}></span>
        </div>
      </div>
       {/* this section is to task ccolumn box */}
      <Container setData={setData} data={data} allItems={allItems}>
        <CreateTodo setData={setData} data={data}/>
        <DragDropContext
         onDragEnd={onDragEnd}
        > 
          {
          data.view.all && data.columnOrder?.map((columnId)=> {

            const column =  data.columns[columnId]
            const items =  column.itemIds?.map(itemId => data?.items[itemId]  )
            return (
              <ContainerItems key={column.id} items={items}  column={column}  allItems={allItems} clearAction={clearAction} setData={setData} data={data}/>
            )
          })
          }
          {
            data.view.active && [1].map(()=>{
              const column = data.columns['column-2']
              const items = column.itemsIds?.map(itemId => data?.items[itemId].complete === false)
              return (
                <ContainerItems key={column.id} items={items} column={column} allItems={allItems} clearAction={clearAction} setData={setData} data={data}  />
              )
            })
          }

        </DragDropContext>
      </Container> 
      <p className='text-[--Very-Light-Gray] h-[5vh] absolute bottom-0 font-extrabold'> Arrastra y suelta para priorizar tareas</p>


    </section>
  )
    
}

export  {App}
