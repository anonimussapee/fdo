import { Droppable } from 'react-beautiful-dnd'
import { BottomTaskState } from '../BottomTaskState'
import { Items } from '../Items'
import { NavigatorTodos } from '../NavigatorTodos'

const ContainerItems = ({column, allItems, items,  clearAction}) => {
  return (
    <div className='box-primary flex flex-col sm:justify-between w-full h-[75%] rounded-xl overflow-hidden'>
      
      <Droppable 
        droppableId={column.id}

      >
        {
          (provided) => (
            <div id='scroll-container' className=' w-full h-[88%] box-primary flex flex-col overflow-y-scroll'
              ref={provided.innerRef}
            >
              {items?.map((item, index) => <Items key={item.id} item={item} index={index}/>)}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      <BottomTaskState allItems={allItems} clearAction={clearAction} />
    </div>

  )
}
const Container= ({children}) => {
  return (
    <div className='main-container-column w-[90%] min-w-[320px] max-w-[600px] h-[75vh]  absolute flex flex-col justify-between font-bold '>
      {children}

      <NavigatorTodos/>
    </div>
  )
} 

export {ContainerItems, Container}