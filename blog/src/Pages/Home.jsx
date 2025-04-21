import React from 'react'

// import Hero from './../assets/Hero.png'
import { useNavigate } from 'react-router-dom'
import create from './../assets/foodSnap.png'
import Category from '../Components/Category'
import Explore from '../Components/Explore'

function Home() {
    const navigate = useNavigate()

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleLogIn = () => {
        navigate('/login')
    }

    

    const handleClick = (e) => {
        e.preventDefault()
        // navigate('/create')
        localStorage.getItem('user') ? navigate('/create') : navigate('/login')
    }
  return (
   
        // <section className='bg-bannerImg bg-repeat bg-cover bg-bottom w-full h-screen'>

        // </section>

        <div className="p-5 bg-[url('./../assets/Hero.png')] bg-cover bg-center">
             <div
    >
      <div className='text-center lg:text-left'>
                <h1 className='font-bold text-[2rem] lg:text-[3rem]'>Your Daily Dish</h1>
                <h1 className='font-bold text-[2rem] lg:text-[3rem] '>A <span className='text-[var(--sec-dark-brown)]'>Food</span> Journey</h1>

                <p className='font-light mt-3 lg:max-w-[40vw] mx-auto md:mx-0 text-[1.5rem] text-center lg:text-left'>Discover new flavors, explore cultural cuisines, and turn every meal into a story. Whether you're a seasoned chef or just starting out, join us on a flavorful adventure that celebrates the love of food.</p>

                <button className='block mx-auto lg:mx-0 bg-[var(--light-brown)] text-white px-8 py-2 text-[1rem] rounded-md mt-3 font-medium cursor-pointer' onClick={handleSignUp}>Sign up</button>


                <p className='text-center lg:text-left font-light mt-3 text-[1rem]'>Do you have account? <button className='text-[var(--light-brown)] font-medium cursor-pointer' onClick={handleLogIn}>Log in</button></p>
            </div>
    </div>
            
            

            {/* <img src={hero} className='w-full bg-cover'/> */}


        {/* CREATE YOUR RECIPE PAGE */}


        <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 items-center text-center bg-white opacity-90 rounded-m justify-center'>

         <img className='rounded-md w-[auto]' src={create} alt='create' />
            
            <div className='mt-5 md:mb-5 '>
                <div >
                <h2 className='font-bold text-[1.5rem] lg:text-[2rem] pr-[2%] pl-[2%] '>Share your <span className='text-[var(--light-brown)]'>Recipes</span></h2>

                <p className='mt-3 text-[1.5rem] font-light lg:pr-[20%]  lg:pl-[20%] items-center'>Got a favorite dish? Share your best recipes and kitchen tips.
                From secret ingredients to family favorites, let your cooking shine.</p>

                <button className='mt-5 bg-[var(--light-brown)] text-white px-5 py-2 rounded-md text-[1rem] cursor-pointer font-medium' onClick={handleClick} >Create New Recipe</button>

                </div>
            </div>

            
        </div>

        <Explore/>



        <Category/>



        </div>
        
   
  )
}

export default Home