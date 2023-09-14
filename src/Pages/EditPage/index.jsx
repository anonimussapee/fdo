import { ThemeContext, TodoTask} from '../../Components/useLocalStorage/context'
import { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle } from '../../Components/CheckCircle'
import { OnSuccess, OnSuccessSimple } from '../../Components/OnSuccess'
import { LoadingItems, LoadingSuccess } from '../../Components/Loader'
import { ArrowUturnLeftIcon, CheckCircleIcon, PencilIcon } from '@heroicons/react/24/solid'




const EditPage = () => {

  const {handleMode, setHandleMode} =useContext(ThemeContext)

  const handleTheme = () => {
    window.document.body.classList.toggle('dark')
    setHandleMode(!handleMode)
  }
    
 

  return (
    <section className="w-full min-w-[320px] h-auto flex flex-col items-center ">
      {/* this section are to header image, title and logo */}
      <div className={`main-bg-image ${ handleMode ? 'bg-todo-dark' : 'bg-todo-ligth ' } relative `}>
        <div className='title-and-icon-container flex justify-between '>
          <Link  to={'/'}>
          <h1 className='text-[3.4rem] font-mono text-white font-extrabold '>TODO</h1>
          </Link>
          <span className={`img  ${handleMode ? ' icon-mode-dark ' : ' icon-mode-ligth '} cursor-pointer`} onClick={handleTheme}></span>
        </div>
      </div>
      
      <div className=' w-[90%] min-w-[320px] max-w-[600px] h-[35vh] flex flex-col gap-5  font-bold  absolute top-[180px]'>
        <div className='flex gap-5 text-white items-center'>
          <h2 className='text-[2.2rem] font-extrabold '>Modo Editor</h2>
          <PencilIcon className='w-10 h-8'/>
        </div>
        <Outlet />

      </div>



    </section>
  )
    
}

const ItemToEdit = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const {data, setData, onSave, load } = useContext(TodoTask)
  const [ready, setReady] = useState(false)

  const item = data.items[id]?.content 


  const [editing, setEditing] = useState(false)
  const [edit, setEdit] = useState('')


  const onEdit = (event) => {

    if(event.keyCode === 13 && (event.target.value).length>2 || event.key === "Enter" && (event.target.value).length>2){
      try {
        const dataNew = {
          ...data,
          items:{
            ...data.items,
            [id]:{...data.items[id],timeStamp: Date.now(), content: edit}
          },
          edit :false,
          view: {
            all: true,
            active: false,
            completed: false,
          },
        }
        setData(dataNew)
        onSave(dataNew)
        setReady(true)

      } catch (error) {
        console.log(error)
      }
    } 
  }

  const onCancel = () => {
    setData({
      ...data,
      view: {
        all: true,
        active: false,
        completed: false,
      },
    })
    navigate('/')
  }

  return (
    <>
       <div className=' flex-grow-[1] min-h-[150px] max-h-[150px] flex items-center gap-6 p-4 box-primary rounded-xl overflow-y-hidden'>
        {ready && <CheckCircleIcon className='w-10 h-12 '/>}
        {!ready && <PencilIcon className='w-10 h-12' onClick={onEdit}/>}        
       {editing && 
        <input type='text' value={edit} onChange={(e)=>{
        setReady(false)
        setEdit(e.target.value)
        }} className='outline-none  box-primary flex-grow-[1] min-h-[100px]' onKeyDown={onEdit}/>

       } 
       {!editing && !load && item && 
        <p onClick={()=>{
          setEdit(item)
          setEditing(true)
          }} className='cursor-pointer box-primary  flex-grow-[1] '>{item }</p>
       }
       {!editing && !load && !item &&
        <p className='cursor-pointer box-primary  flex-grow-[1] '>{'item no encontrado' }</p>
       }
          {load && 
        <p onClick={()=>{
          setEdit(item)
          setEditing(true)
          }} className='cursor-pointer box-primary  flex-grow-[1]  '>cargando...</p>
       }

        <ArrowUturnLeftIcon className='w-10 h-12' onClick={onCancel}/>
      </div>
      {ready && <OnSuccessSimple buttonsms={'Regresar'} message={'Editado con éxito'} navigateTo={'/'} />}
    </>
  )
}

export  {EditPage, ItemToEdit}
