const NavigatorTodos = ({ data, setData}) => {
  const onAllView = () => {
    const dataNew = {
      ...data,
      view:{
      all: true,
      active: false,
      completed: false,
    }
    }
    setData(dataNew)
  }
  const onActiveView = () => {
    const dataNew = {
      ...data,
      view:{
      all: false,
      active: true,
      completed: false,
    }
  }
    setData(dataNew)
  }
  const onCompleteView = () => {
    const dataNew = {
      ...data,
      view:{
      all: false,
      active: false,
      completed: true,
    }
  }
    setData(dataNew)
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