import { useNavigate } from 'react-router-dom'

const OnSuccess = ({message,  navigateTo, data, setData}) => {

  const navigate =  useNavigate() 

  const onNavigate = () => {
    setData({...data,
      view:{
        active:true,
        all: false,
        completed: false
      }
    })
    navigate(navigateTo)
  }
  
  return (
    <div className='box-primary flex flex-col gap-5 p-10 border-b-[1px] h-[125px] border-b-white rounded-xl'>
      <p className='text-[2.2rem]'>{message}</p>
      <button className='border-[1px] border-[gray] box-primary p-5 rounded-xl text-[1.8rem]'
      onClick={onNavigate}
      >
        Ver lista de tareas
      </button>
    </div>
  )
}

const OnError = ({message}) => {

  
  return (
    <div className='box-primary flex flex-col gap-5 p-10 border-b-[1px] h-[125px] border-b-white rounded-xl'>
      <p className='text-[2.2rem]'>{message}</p>
    </div>
  )
}
const OnSuccessSimple = ({message,buttonsms,  navigateTo}) => {

  const navigate =  useNavigate() 

  const onNavigate = () => {
    navigate(navigateTo)
  }
  
  return (
    <div className='box-primary flex flex-col gap-5 p-10 border-b-[1px] h-[125px] border-b-white rounded-xl'>
      <p className='text-[2.2rem]'>{message}</p>
      <button className='border-[1px] border-[gray] box-primary p-5 rounded-xl text-[1.8rem]'
      onClick={onNavigate}
      >
        {buttonsms}
      </button>
    </div>
  )
}

export {OnSuccess, OnSuccessSimple, OnError}