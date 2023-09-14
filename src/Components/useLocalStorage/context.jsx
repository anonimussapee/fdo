import { createContext } from 'react'
import {  useEffect, useState } from 'react'

const initialValue = {
  items : {
    'item-1': {
      complete:false , id: 'item-1', content: 'crea tu primer ToDo'
    }
  },
  columns : {
    'column-1': {
      title : 'All',
      id : 'column-1',
      itemIds : ['item-1']
    }   
  },
  columnOrder : [ 'column-1'],
  view: {
    all: true,
    active: false,
    completed: false,
  },
  edit: false
  
}

const TodoTask = createContext()

const TodoTaskProvider = (props) => {

  const [data, setData] = useState(initialValue || [])
  const [sincronize, setSincronize] = useState(true)
  const [load, setLoad] =  useState (true)
  const [error, setError] = useState(false)
 
  const dataJson = localStorage.getItem('todoItems')

  useEffect(()=>{
    setTimeout(()=>{

      try {

        const dataParsed = JSON.parse(dataJson) || initialValue
        setData(dataParsed)
        setSincronize(true)
        setLoad(false)
      } catch (error) {

        setError(true)
        
      }

    },1500)
  },[sincronize])

  const onSave = (dataNew) =>{
    setData(dataNew)
    localStorage.setItem('todoItems', JSON.stringify(dataNew))
  }

  return (
    <TodoTask.Provider value={{
    data, 
    setData,
    sincronize,
    setSincronize,
    error,
    load,
    onSave,
  }}>
      {props.children}
    </TodoTask.Provider>
  )
}

const ThemeContext =  createContext()

const ThemeContextProvider = (props) => {
  const [handleMode, setHandleMode] = useState(false) 
  
  const themeJson = localStorage.getItem('themeTodo')
  useEffect(()=>{
    setTimeout(()=>{
      const dataParsed = JSON.parse(themeJson) || false
      setHandleMode(dataParsed)
      if(dataParsed){
        window.document.body.classList.toggle('dark')
      }
      
    },1)
  },[])

  const onSave = (newState) => {
    localStorage.setItem('themeTodo',JSON.stringify(newState))
    setHandleMode(newState)
  }
  return (
    <ThemeContext.Provider value={{handleMode, setHandleMode:onSave}}>
      {props.children}
    </ThemeContext.Provider>
  )
}
export {TodoTaskProvider, TodoTask, ThemeContextProvider, ThemeContext} 