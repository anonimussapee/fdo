const NavigatorTodos = ({allItems, data, setData}) => {
  const onAllView = () => {
    setData({
      ...data,
      view:{
      all: true,
      active: false,
      completed: false,
    }
    })
  }
  const onActiveView = () => {
    console.log(allItems)
    setData({
      ...data,
      view:{
      all: false,
      active: true,
      completed: false,
    }
  })
  }
  const onCompleteView = () => {
    setData({
      ...data,
      view:{
      all: false,
      active: false,
      completed: true,
    }
  })
  }
  return (
    <div className='w-full h-[8%] flex  items-center justify-evenly box-primary font-semibold text-[--Very-Light-Gray]'>
      <p onClick={onAllView}  className={` ${data.view.all ? 'text-[--Bright-Blue] ' : ''} cursor-pointer`}>Todos</p>
      <p onClick={onActiveView} className={` ${data.view.active ? 'text-[--Bright-Blue]' : ''} cursor-pointer`}>Activos</p>
      <p onClick={onCompleteView} className={` ${data.view.completed ? 'text-[--Bright-Blue]' : ''} cursor-pointer`}>Completos</p>
    </div>
  )
}

export {NavigatorTodos}