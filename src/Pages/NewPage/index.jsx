import { ThemeContext, TodoTask} from '../../Components/useLocalStorage/context'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from '../../Components/CheckCircle'
import { OnSuccess } from '../../Components/OnSuccess'
import { LoadingSuccess } from '../../Components/Loader'




const NewPage = () => {

  const {data, setData, onSave } = useContext(TodoTask)
  const {handleMode, setHandleMode} =useContext(ThemeContext)

  const [success,setSuccess] = useState({load:false, success:false, error:false})  
  
  const [idToNavigate,setIdToNavigate] = useState('')

  const [todoName, setTodoName] = useState('')
  const handleTheme = () => {
    window.document.body.classList.toggle('dark')
    setHandleMode(!handleMode)
  }
  
  const onCreate = (event) => {

    const idsActives = [] 
    if(event.keyCode === 13 && (event.target.value).length>2 || event.key === "Enter" && (event.target.value).length>2){
      setSuccess({ load:true, success:false, error:false })

      // aqui estan todos los items para determinar un id diferente
      try {
          const ids = Object.keys(data.items)
          const idN = ids.map(item=>Number(item.replace('item-','')))
          let idNew = 0
          for (let i = 1; i < 200; i++) {
          const condition = idN.some(item=>item === i)
          if(!condition){
            idNew = i
            break
          }
          }
    
          const itemsActives = Object.values(data.items)
          itemsActives.forEach(item=>idsActives.push(item.id)) 
          const dataNew = {
            ...data,
            items:{
              ...data.items,
              [`item-${idNew}`]:{timeStamp: Date.now() ,complete : false ,id : `item-${idNew}`, content: todoName}
            },
            columns:{
              ...data.columns,
              'column-1':{
                ...data.columns['column-1'],
                itemIds : [ ...idsActives, `item-${idNew}`,  ]
              },
            },
          }
          setIdToNavigate(`item-${idNew}`)
          setData(dataNew)
          onSave(dataNew)
          setTodoName('')
          setTimeout(() => {
              setSuccess({load:false, success: true, error: false })
          }, 500);

        
      } catch (error) {
        setSuccess({load:false, success: false, error: true })
        
      }
      
    }

  }
  
  const onCreateCheck = () => {
    const idsActives = [] 
    if(todoName.length>2){
      try {
        setSuccess({ load:true, success:false, error:false })
        const ids = Object.keys(data.items)
        const idN = ids.map(item=>Number(item.replace('item-','')))
        let idNew = 0
        for (let i = 1; i < 300; i++) {
        const condition = idN.find(item=>item === i)
        if(!condition){
          idNew = i
          break
        }
        }

        const itemsActives = Object.values(data.items)
        itemsActives.forEach(item=>idsActives.push(item.id)) 
        const dataNew = {
          ...data,
          items:{
            ...data.items,
            [`item-${idNew}`]:{timeStamp: Date.now() ,complete : false ,id : `item-${idNew}`, content: todoName}
          },
          columns:{
            ...data.columns,
            'column-1':{
              ...data.columns['column-1'],
              itemIds : [...idsActives, `item-${idNew}`,   ]
            }
          }
        }
        setIdToNavigate(`item-${idNew}`)
        setData(dataNew)
        onSave(dataNew)
        setTodoName('')
        
      } catch (error) {
        setSuccess({load:false, success: false, error: true })
        
      }
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
          <span className={`img  ${handleMode ? ' icon-mode-dark ' : ' icon-mode-ligth '} cursor-pointer`} onClick={handleTheme}></span>
        </div>
      </div>
      
      <div className=' w-[90%] min-w-[320px] max-w-[600px] h-[35vh] flex flex-col gap-5 justify-between font-bold  absolute top-[180px]'>
        <div className=' flex-grow-[1] min-h-[80px] max-h-[80px] flex items-center gap-6 p-4 box-primary rounded-xl'>
          <CheckCircle stateCheck={true} checkAction={onCreateCheck} />
          <input className='box-primary dark:placeholder:text-[--text-color-primary] outline-none flex-grow-[1]' name='todo-creator'  id='todo-creator' type='text' value={todoName} onChange={(e)=>{setTodoName(e.target.value)}} onKeyDown={onCreate} placeholder='Crear una nueva Tarea'/>
        </div>
        {success.success && <OnSuccess message={'Tarea agregada con éxito! '} data={data} setData={setData} navigateTo={`/#${idToNavigate}`}/>}
        {success.load && <LoadingSuccess message={'Tarea agregada con éxito! '}/>}
      </div>



    </section>
  )
    
}

export  {NewPage}
