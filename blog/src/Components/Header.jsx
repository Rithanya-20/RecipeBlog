import React, { useState } from 'react'
import logo from './../assets/logo-iok.png'
import { useNavigate, Link } from 'react-router-dom'


export default function Header() {


      const [isOpen, setIsOpen] = useState(false)
    
      const navigate = useNavigate()

      const handleHome =  () => {
        navigate('/')
      }

      const handleRecipe = () => {
        navigate('/recipe')
      }  

      const handleLogout = () => {
        localStorage.clear()
        if(isOpen){
          setIsOpen(false)
        }
         navigate('/')
      }

      // const handleAbout = () => {
        
      //    navigate('/about')
      // }

      return (

        <>
        <div className='text-[var(--dark-brown)] hidden md:flex justify-between items-center font-bold -tracking-tight'>
    
             
             <div className='flex items-center'>
    
            <img src={logo} alt='logo' className='w-[200px] h-[60px] mt-2'/>
    
            <ul className='flex gap-[20%] '>
            <li className='cursor-pointer' onClick={handleHome}>Home</li>
            <li className='cursor-pointer' onClick={handleRecipe}>Recipe</li>
            {/* <li className='cursor-pointer' onClick={handleAbout}>About</li> */}
           </ul>
            </div>
    
           
             
    
    
            
    
            <div >
              {localStorage.getItem('user') ? (<>
              
                <button className='cursor-pointer px-3 py-2 text-[12px] rounded-md text-white bg-[var(--dark-brown)] mr-3' onClick={handleLogout}>Log out</button>
              
              </>) : (<>
              
                <button className='cursor-pointer px-3 py-2 text-[12px] rounded-md text-white bg-[var(--dark-brown)] mr-3' onClick={() => navigate('login/')}>Log in</button>
    
                <button className='cursor-pointer px-3 py-2 text-[12px] rounded-md bg-[#EBEBEB]' onClick={() => navigate('signup/')}>Sign up</button>
              
              </>)}
                
            </div>
        </div>


        <div className='md:hidden'>
    
            <img src={logo} alt='logo' className='w-[200px] h-[60px] mt-2'
            onClick={() => setIsOpen(!isOpen)}/>

        </div>

        {isOpen && (
          <div className=' top-16 w-[full] bg-[#FFF0ED] font-medium shadow-md md:hidden ' >
            <nav className='flex flex-col space-y-0.5 px-4 py-4'>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>

              <Link to="/recipe" onClick={() => setIsOpen(false)}>Recipe</Link>

              {/* <Link to="/about" onClick={() => setIsOpen(false)}>About</Link> */}

             { localStorage.getItem('user') ? (<>
             
              <Link to="/" onClick={() => handleLogout()}>Logout</Link>
             
             </>) : (<>
             
              <Link to="/login" onClick={() => setIsOpen(false)}>Log In</Link>

              <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
             </>) }

              

              
            </nav>
          </div>
        )}



        </>
      )

      
    
}
