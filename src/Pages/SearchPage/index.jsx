import { ThemeContext, TodoTask} from '../../Components/useLocalStorage/context'
import { useContext, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import {  OnSuccessSimple } from '../../Components/OnSuccess'
import { ArrowUturnLeftIcon, CheckCircleIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/solid'
import { CheckCircle } from '../../Components/CheckCircle'




const SearchPage = () => {

  const navigate = useNavigate()
  const {handleMode, setHandleMode} = useContext(ThemeContext)
  const {data, setData } = useContext(TodoTask)

  const [searchValue,setSearchValue] = useState('')

  const handleTheme = () => {
    window.document.body.classList.toggle('dark')
    setHandleMode(!handleMode)
  }
    
 
  const handleChange = (e) => {
    setSearchValue(e.target.value)
  } 

  const onFind = (e) => {
    if(e.keyCode === 13 || e.key === "Enter") {

      navigate(`/search/${searchValue}`)
    }
  } 

  return (
    <section className="w-full min-w-[320px] h-auto flex flex-col items-center ">
      {/* this section are to header image, title and logo */}
      <div className={`main-bg-image ${ handleMode ? 'bg-todo-dark' : 'bg-todo-ligth ' } relative `}>
        <div className='title-and-icon-container flex justify-between '>
          <Link  to={'/'}>
          <h1 className='text-[3.4rem] font-mono text-white font-extrabold '>TODO</h1>
          </Link>
          <div className='flex gap-10'>
            <PencilIcon className='w-10 h-14 text-[white] cursor-pointer' onClick={()=>setData({...data,edit:!data.edit})}/>
            <span className={`img  ${handleMode ? ' icon-mode-dark ' : ' icon-mode-ligth '} cursor-pointer`} onClick={handleTheme}></span>

          </div>
        </div>
      </div>
      
      <div className=' w-[90%] min-w-[320px] max-w-[600px] h-[35vh] flex flex-col gap-5  font-bold  absolute top-[150px]'>
        <div className='flex gap-5 text-white items-center relative'>
          <input type="search" name="searchBox" id="searchBox"  placeholder='buscar por nombre' className='flex-grow-[1] p-5 pl-16 box-primary border-[#5e5d5d] border-[1px] rounded-xl' value={searchValue} onChange={handleChange} onKeyDown={onFind}/>
          <MagnifyingGlassIcon className='w-10 h-14 absolute left-4'/>
        </div>
        <Outlet />

      </div>



    </section>
  )
    
}

const ItemFinded = () => {

  const {name} = useParams()

  const {data,onSave, load, setData } = useContext(TodoTask)


  const item = (Object.values(data.items)).filter(items=>{
    return (items.content).toLowerCase().includes(name.toLocaleLowerCase())
      })

  return (
 
        <div id='scroll-container' className=' w-full min-h-[400px] rounded-xl box-primary flex flex-col overflow-y-scroll'>
          {item.length>0 && !load && 
            item?.map(item=>{
              return <ItemsSearch data={data} item={item} onSave={onSave} setData={setData} key={item.id}/>
          })}
          {load && <p className='box-primary content-center h-[100%] w-full flex justify-center items-center font-extrabold text-[2.2rem]'> cargando... </p>}

          {!load && item.length === 0 && <p className='box-primary content-center h-[100%] w-full flex justify-center items-center font-extrabold text-[2.2rem]'> no existe este item </p>}
        </div>
   
  )
}

const ItemsSearch = ({data, setData, item,  onSave}) => {

  const [deleting, setDeleting ] = useState(false)  
  const [checking, setChecking ] = useState(false)  
  const navigate = useNavigate()


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
    <div  className={`items-of-todos box-primary  h-[80px] min-h-[80px] ss:h-[70px] ss:min-h-[70px]  flex items-center justify-between gap-6 p-4  ${deleting ? ' deleting ': ' '} ${checking ? ' checking ': ' '}`}
              id={item.id}
              >
                {data.edit && <PencilIcon className='w-10 h-12 cursor-pointer' onClick={onEdit}/>}
                {
                !data.edit &&            
                  <CheckCircle setChecking={setChecking} onSave={onSave} stateCheck={item.complete} item={item} data={data} setData={setData} />
                }
                <p className=' flex-grow-[1]'
                  
                >{item.content}</p>
                <span className='cross-icon img cursor-pointer ' onClick={onDelete}></span>
              </div>
  )
}
 
export  {SearchPage, ItemFinded}
