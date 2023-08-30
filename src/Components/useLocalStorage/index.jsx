import {  useEffect, useState } from 'react'

const useLocalStorage = (initialValue) => {
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

  return {
    data, 
    setData,
    sincronize,
    setSincronize,
    error,
    load,
    onSave,
  }
}

const useLocalStorageTheme = (initialValue) =>{
  const [handleMode, setHandleMode] = useState(initialValue) 
  
  const themeJson = localStorage.getItem('themeTodo')
  useEffect(()=>{
    setTimeout(()=>{
      const dataParsed = JSON.parse(themeJson) || initialValue
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
  return {handleMode, setHandleMode:onSave}
}
export {useLocalStorage, useLocalStorageTheme} 