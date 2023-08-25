const BottomTaskState = ({itemsTotal, clearAction}) => {
  return (
    <div className='w-full h-[12%] px-4  box-primary flex justify-between items-center text-[--Very-Light-Gray]'>
       <p>{itemsTotal || 4 } Tareas</p>
       <p onClick={clearAction} >Limpiar Completas</p>
    </div>
  )
}

export {BottomTaskState}