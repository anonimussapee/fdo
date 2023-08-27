const NavigatorTodos = ({active}) => {
  return (
    <div className='w-full h-[8%] flex  items-center justify-evenly box-primary font-bold text-[--Very-Light-Gray]'>
      <p className={` ${active ? '' : 'text-[--Bright-Blue]'} cursor-pointer`}>Todos</p>
      <p className={` ${active ? '' : 'text-[--Bright-Blue]'} cursor-pointer`}>Activos</p>
      <p className={` ${active ? '' : 'text-[--Bright-Blue]'} cursor-pointer`}>Completos</p>
    </div>
  )
}

export {NavigatorTodos}