import React from 'react'
import {useState} from 'react'
import logoBurger from './../assets/logo-burger.png'
import {Link, useNavigate} from 'react-router-dom' 
import axios from 'axios'


function Login() {
   const [email, setEmail] = useState()
   const [password, setPassword] = useState()

   const navigate = useNavigate()

   const handleSubmit = (e) => {
     e.preventDefault()
     axios.post("https://inourkitchen.onrender.com/login", {email, password})
     .then(result => {
        console.log(result);
        if(result.data == "Success"){
            localStorage.setItem('user',email)
            navigate('/')
        }
        else{
            navigate('/signup')
            alert("You are not Register")
        }
        
     }) 
     .catch(err => console.log(err)
     )

   }


  return (

   

    <div className='h-[100vh]'>
    
     {/* <div className='flex flex-col text-center w-[100%] h-[100vh] items-center'>
        <img className='h-[200px] w-[200px]' src={logoBurger} alt='logo'/>

        <div className='p-[30px] h-[50%] bg-blue-500 w-[50%]'>
           <h1 className=''>Login</h1>
            <form className='flex flex-col   bg-red-400 mt-[30px] '> 
                
                <div>
               
                <h2 className='w-[100%] font-[30px]'>Name</h2>
                <input className='w-[100%] p-4' id='name' type='text' placeholder='Enter your name'/>
                
                <h2 className='w-[100%]'>Password</h2>
                <input className='w-[100%] p-4' id='password' type='password' placeholder='Enter your password'/>
                </div>
            </form>
        </div>
     </div> */}
    
    <div className='bg-[#FFF0ED] max-w-sm rounded-lg shadow-lg p-6 mx-auto mt-[15px] '>
        <div className='text-center'>
            <img className='h-50 w-auto mx-auto' src={logoBurger} alt='logo'/>
            <h2 className=' text-3xl font-bold tracking-tight text-[#793E37]'>Login</h2>
        </div>

        <form className='space-y-6 mt-8' onSubmit={handleSubmit}>
            <div>
                <label for="email" className='block text-sm font-medium text-[#974E44]'>Email</label>
                <div className='mt-1'>
                    <input className='appearance-none block w-full px-3 py-2 shadow-sm focus:outline-none sm:text-sm border-[#793E37] placeholder-[rgb(121,62,55)] ' id='email' type='email' placeholder='Email...'
                    onChange={e => setEmail(e.target.value)}
                    required autoFocus/>
                </div>
            </div>

            <div>
                <label for="password" className='text-sm font-medium text-[#974E44]'>Password</label>
                <div className='mt-1'>
                    <input className='w-full px-3 py-2 placeholder-[rgb(121,62,55)] shadow-sm focus:outline-none' id='password' type='password' placeholder='Password...' 
                    onChange={e => setPassword(e.target.value)}
                    required autoFocus/>
                </div>
            </div>


            <div className='text-center'>
                <button className='inline-flex items-center rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-4 cursor-pointer bg-[#793E37] text-white font-medium tracking-tight text-base hover:bg-[#B55D51] justify-center' type='submit'>Submit</button>
            </div>
        </form>

    </div>
    
    </div>
   

    
  )
}

export default Login