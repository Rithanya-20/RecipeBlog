
import './App.css'
import Home from './Pages/Home'
import Header from './Components/Header'
import Search from './Components/Search'
import Footer from './Components/Footer'
import Hero from './assets/Hero.png'

import Login from './Components/Login'
import { Route, Routes } from 'react-router-dom'
import Recipe from './Pages/Recipe'
import Create from './Pages/Create'
import RecipePage from './Pages/RecipePage'
import Signup from './Components/Signup'
import About from './Pages/About'

function App() {
  

  return (
  
    <div className='min-h-screen flex flex-col'>
    
    <div 
          className="bg-cover bg-center h-[100vh]  "
          style={{ backgroundImage: `url(${Hero})` }}
        >
    
   
    <div className='pr-[10%] pl-[10%] pt-5'>
    <Header/>
    </div>

    <div className='flex-1 pr-[10%] pl-[10%] '>
      {/* <Header/> */}
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/recipe' element={<Recipe/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path="/recipepage/:id" element={<RecipePage/>}></Route>

    </Routes>

    
    
    </div>
    
    <div>
    <Footer/>
    </div>
  
    </div>

    </div>
  )
}

export default App
