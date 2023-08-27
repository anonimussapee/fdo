import { Draggable } from 'react-beautiful-dnd'
import { CheckCircle } from '../CheckCircle'

const Items = ({data, setData, item, index}) => {
  
  const onDelete = () => {
    const newData = data.columns['column-1'].itemIds
      newData.splice(index,1)
    console.log( newData)
    setData({
      ...data,
      items:{
        ...data.items,
        [item.id] : {...data.items[item.id], complete: true}
      },
      columns:{
        ...data.columns,
        'column-1':{
          ...data.columns['column-1'],
          itemIds :newData
        },

        }
      }
    )
  }

  return (
    <Draggable
      draggableId={item.id}
      index={index}

    >
      {
        (provided, snapshot) => (
          <div className={`items-of-todos box-primary  h-[80px] ss:h-[70px]  flex items-center justify-between gap-6 p-4 ${snapshot.isDragging ? 'rounded-xl scale-105 drag' : ' '}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
          >
            <CheckCircle stateCheck={item.complete} item={item} data={data} setData={setData}/>
            <p className=' flex-grow-[1]'
              {...provided.dragHandleProps}
            >{item.content}</p>
            <span className='cross-icon img cursor-pointer ' onClick={onDelete}></span>
          </div>

        )
      }

    </Draggable>
  )
}

export {Items}