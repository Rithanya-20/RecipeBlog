import React, { useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import {FaSearch} from "react-icons/fa"
import { useNavigate, useLocation } from 'react-router-dom'

import RecipeCards from '../Components/RecipeCards';
import axios from 'axios'
function Recipe() {

    const navigate = useNavigate();
    const location = useLocation()

    const [recipe, setRecipe] = useState([])
    const [search, setSearch] = useState("")
    const [searchRecipe, setSearchRecipe] = useState([])

    const val = location.state?.value || ''
  
    
    const searchRecipes = async (searchTerm) => {
        console.log("SearchItem: "+ searchTerm);
        
        const res = await fetch('https://inourkitchen.onrender.com/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: searchTerm })
          });
        
          const data = await res.json();
         
        

          if(!data){
            console.log("Error");
            
        }
        else{
            setSearchRecipe(data)
           
            console.log('Search results:', data);
            
        }
    }
    
    
    const getRecipeData = async() => {
        const res = await axios.get("https://inourkitchen.onrender.com/recipe", {
            headers:{
                "Content-Type":"application/json"
            }
        })

        // console.log(res);

        if(res.data.status === 401 || !res.data){
            console.log("Error");
            
        }
        else{
            setRecipe(res.data.getRecipe)
        }
        
    }


    useEffect(() => {
        searchRecipes(val) 
    }, [val])



    useEffect(() => {
        getRecipeData()
   
    }, [])

    const handleSearch = (value) => {
        console.log(value);
        setSearch(value)
        
        searchRecipes(value)
    }

    const HandleCreate = () => {
        localStorage.getItem('user') ? navigate('/create') : navigate('/login')
    }

    const handleHome = (e) => {
        e.preventDefault()
        navigate('/')
      }
  return (
    <div>

        <div className='flex flex-wrap justify-between items-center'>
        <p className='text-[grey]'><span onClick={handleHome} className='cursor-pointer'>Home</span> &gt; <span className='text-[var(--dark-brown)] font-bold'>{val || 'Recipe'}</span></p>

        <div className='flex justify-between items-center outline-none border px-2 py-1 rounded-md border-gray-300 lg:w-[20rem] focus:ring-1 ring-[var(--light-brown)]'>
            
          
            <input type='text' placeholder='Search...' className='w-[90%] outline-none' 
            value={search || ""} onChange={e => handleSearch(e.target.value)}/>

            <FaSearch color='var(--dark-brown)' className='mt-0 cursor-pointer'/>
        </div>
        
        <CiCirclePlus size={50} color='var(--dark-brown)' className='mt-0 cursor-pointer' onClick={HandleCreate} />

        </div>

        <div>
           
        </div>

       


        <div>
           
            <h2 className='font-bold mt-5 text-[2rem] text-[var(--dark-brown)] text-center lg:text-left'>Recently Added</h2>

            <div className='mt-5 flex justify-center flex-wrap gap-3'>

            {searchRecipe.length ? ( searchRecipe.map( (item) => (
                        <div className='w-[200px] lg:w-[330px] shadow-xl rounded-lg overflow-hidden cursor-pointer bg-white'>
                            
                        <div onClick={() => navigate('/recipepage/'+item._id)}>
    
                            <RecipeCards value={item}/>
                        
                        </div>
    
                    </div>
                ))) : (<>
                
                {recipe ? ( recipe.map( (item) => (
                        <div className='w-[200px] lg:w-[330px] shadow-xl rounded-lg overflow-hidden cursor-pointer bg-white'>

                        <div onClick={() => navigate('/recipepage/'+item._id)}>
    
                            <RecipeCards value={item}/>
                        
                        </div>
    
                    </div>
                ))) : (<></>)}
                </>)}


                {/* {isSearch ? (<>
                    
                {searchRecipe ? ( searchRecipe.map( (item) => (
                        <div className='w-[260px] shadow-xl rounded-lg overflow-hidden cursor-pointer'>
                            
                        <div onClick={() => navigate('/recipepage/'+item._id)}>
    
                            <RecipeCards value={item}/>
                        
                        </div>
    
                    </div>
                ))) : (<></>)}
                
                
                </>) : (<>
                
                    {recipe ? ( recipe.map( (item) => (
                        <div className='w-[260px] shadow-xl rounded-lg overflow-hidden cursor-pointer'>

                        <div onClick={() => navigate('/recipepage/'+item._id)}>
    
                            <RecipeCards value={item}/>
                        
                        </div>
    
                    </div>
                ))) : (<></>)}
                
                
                </>)} */}

             

              
                
            </div>
        </div>

        


        
    </div>
  )
}

export default Recipe