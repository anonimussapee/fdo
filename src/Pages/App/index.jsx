import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppUI } from './AppUI'
import './App.css'
import { ThemeContextProvider, TodoTaskProvider } from '../../Components/useLocalStorage/context'
import { NewPage } from '../NewPage'
import { EditPage, ItemToEdit } from '../EditPage'
import { ItemFinded, SearchPage } from '../SearchPage'

const App = () => {
  

  return (
    <BrowserRouter>
      <ThemeContextProvider>

        <TodoTaskProvider>

          <Routes>
          
            <Route path='/' element={<AppUI/>}/>
            <Route path='/new' element={<NewPage/>}/>
            <Route path='/edit' element={<EditPage/>}>
              <Route path=':id' element={<ItemToEdit/>}/>
            </Route>
            <Route path='/search' element={<SearchPage/>}>
              <Route path=':name' element={<ItemFinded/>}/>
            </Route>

          </Routes>  

        </TodoTaskProvider>

      </ThemeContextProvider>
    </BrowserRouter>
  )

}
export {App}