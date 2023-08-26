import { Draggable } from 'react-beautiful-dnd'
import { CheckCircle } from '../CheckCircle'

const Items = ({item, index}) => {
  return (
    <Draggable
      draggableId={item.id}
      index={index}
      shouldRespectForcePress
    >
      {
        (provided) => (
          <div className='items-of-todos box-primary  h-[80px] ss:h-[70px]  flex items-center justify-between gap-6 p-4 '
          {...provided.draggableProps}
          ref={provided.innerRef}
          onTouchStart={()=>{
            console.log('vibrate')
            setTimeout(() => {
              
              if('vubrate' in navigator){
                navigator.vibrate(100)
              }
            }, 300);
          }}
          >
            <CheckCircle stateCheck={true}/>
            <p className='box-primary flex-grow-[1]'
              {...provided.dragHandleProps}
            >{item.content}</p>
            <span className='cross-icon img '></span>
          </div>

        )
      }

    </Draggable>
  )
}

export {Items}