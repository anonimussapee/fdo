import { Draggable } from 'react-beautiful-dnd'
import { CheckCircle } from '../CheckCircle'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PencilIcon } from '@heroicons/react/24/solid'

const Items = ({data, setData, item, index, onSave}) => {
  
  const navigate = useNavigate()
  const [deleting, setDeleting ] = useState(false)  
  const [checking, setChecking ] = useState(false)  

  const onDelete = () => {
    const newData = data.columns['column-1'].itemIds
      newData.splice(index,1)
    console.log( newData)
    const dataNew = {
      ...data,
      columns:{
        ...data.columns,
        'column-1':{
          ...data.columns['column-1'],
          itemIds :newData
        },

        }
      }
      setDeleting(true)
      setTimeout(() => {        
        delete dataNew.items[item.id]
        setData(dataNew)
        onSave(dataNew)
        setDeleting(false)
      }, 200);
  }

  const onEdit = () =>{
    navigate(`/edit/${item.id}`)
  }
  return (
    <Draggable
      draggableId={item.id}
      index={index}

    >
      {
        (provided, snapshot) => (
          <div className={`items-of-todos box-primary  h-[80px] min-h-[80px] ss:h-[70px] ss:min-h-[70px]  flex items-center justify-between gap-6 p-4 ${snapshot.isDragging ? 'rounded-xl scale-105 drag' : ' '} ${deleting ? ' deleting ': ' '} ${checking ? ' checking ': ' '}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
          id={item.id}
          >
            {data.edit && <PencilIcon className='w-10 h-12 cursor-pointer' onClick={onEdit}/>}
            {
            !data.edit &&            
              <CheckCircle setChecking={setChecking} onSave={onSave} stateCheck={item.complete} item={item} data={data} setData={setData}/>
            }
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