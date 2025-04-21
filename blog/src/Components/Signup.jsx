import React, { useState } from 'react'
import logoBurger from './../assets/logo-burger.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
       e.preventDefault()
       console.log(name);
       console.log(email);
       console.log(password);
       
       axios.post('https://inourkitchen.onrender.com/register',{name, email, password})
       .then(res => {console.log(res)
        localStorage.setItem('user',email)
       navigate('/')
       }
       )
       .catch(err => console.log(err)
       )
       
       
    }
  return (
   <div className='h-[100vh]'>
       
      
       
       <div className='bg-[#FFF0ED] max-w-sm rounded-lg shadow-lg p-6 mx-auto mt-4 '>
           <div className='text-center'>
               <img className='h-50 w-auto mx-auto' src={logoBurger} alt='logo'/>
               <h2 className=' text-3xl font-bold tracking-tight text-[#793E37]'>Sign Up</h2>
           </div>
   
           <form onSubmit={handleSubmit} className='space-y-6 mt-8'>

           <div>
                   <label for="email" className='block text-sm font-medium text-[#974E44]'>Name</label>
                   <div className='mt-1'>
                       <input className='appearance-none block w-full px-3 py-2 shadow-sm focus:outline-none sm:text-sm border-[#793E37] placeholder-[rgb(121,62,55)] ' id='name' type='text' placeholder='Name...' 
                       onChange={(e) => setName(e.target.value)}
                       required autoFocus/>
                   </div>
               </div>
   
               <div>
                   <label for="email" className='block text-sm font-medium text-[#974E44]'>Email</label>
                   <div className='mt-1'>
                       <input className='appearance-none block w-full px-3 py-2 shadow-sm focus:outline-none sm:text-sm border-[#793E37] placeholder-[rgb(121,62,55)] ' id='email' type='email' placeholder='Email...' 
                       onChange={(e) => setEmail(e.target.value)}
                       required autoFocus/>
                   </div>
               </div>
   
               <div>
                   <label for="password" className='text-sm font-medium text-[#974E44]'>Password</label>
                   <div className='mt-1'>
                       <input className='w-full px-3 py-2 placeholder-[rgb(121,62,55)] shadow-sm focus:outline-none' id='password' type='password' placeholder='Password...'
                       onChange={(e) => setPassword(e.target.value)} required autoFocus/>
                   </div>
               </div>
   
   
               <div className='text-center'>
                   <button className='inline-flex items-center rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-4 cursor-pointer bg-[#793E37] text-white font-medium tracking-tight text-base hover:bg-[#B55D51] justify-center' type='submit' >Submit</button>
               </div>
           </form>
   
       </div>
       
       </div>
  )
}

export default Signup