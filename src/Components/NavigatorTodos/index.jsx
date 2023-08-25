const NavigatorTodos = ({active}) => {
  return (
    <div className='w-full h-[8%] flex  items-center justify-evenly box-primary font-bold text-[--Very-Light-Gray]'>
      <p className={` ${active ? '' : 'text-[--Bright-Blue]'}`}>Todos</p>
      <p className={` ${active ? '' : 'text-[--Bright-Blue]'}`}>Activos</p>
      <p className={` ${active ? '' : 'text-[--Bright-Blue]'}`}>Completos</p>
    </div>
  )
}

export {NavigatorTodos}