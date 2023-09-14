const LoadingItems = () => {
  return (
    <>
        <div className={`items-of-todos box-primary item-loading h-[80px] min-h-[70px] ss:h-[70px]  flex flex-col items-center justify-center gap-2 p-4 border-b-white rounded-xl`}>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
        </div>
        <div className={`items-of-todos box-primary item-loading h-[80px] min-h-[70px] ss:h-[70px]  flex flex-col items-center justify-center gap-2 p-4 border-b-white rounded-xl`}>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
        </div>
        <div className={`items-of-todos box-primary item-loading h-[80px] min-h-[70px] ss:h-[70px]  flex flex-col items-center justify-center gap-2 p-4 border-b-white rounded-xl`}>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
        </div>

    </>

  )
}
const LoadingSuccess = ({message}) => {
  return (
      <div className={`items-of-todos box-primary item-loading h-[125px] min-h-[125px] ss:h-[70px]  flex flex-col items-center justify-center gap-2 p-4 border-b-white rounded-xl`}>
        <span className='w-[90%] h-[35px] blur-sm rounded-lg item-loading'></span>
        <button className='border-[1px] border-[gray] blur-sm  box-primary p-5 rounded-xl text-[1.8rem] item-loading'>
        {message}
      </button>
      </div>
  )
}

export {LoadingItems, LoadingSuccess}
