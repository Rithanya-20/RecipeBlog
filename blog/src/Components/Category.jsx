import React from 'react'
import breakfast from './../assets/Category/breakfast.jpg'
import lunch from './../assets/Category/lunch.jpg'

import dinner from './../assets/Category/dinner.jpg'

import appetizer from './../assets/Category/appetizer.jpg'

import salad from './../assets/Category/salad.jpg'

import pizza from './../assets/Category/pizza.jpg'
import pasta from './../assets/Category/pasta.jpg'

import smoothie from './../assets/Category/smoothie.jpg'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'


function Category() {

  const navigate = useNavigate()


  const [searchRecipe, setSearchRecipe] = useState([])
  
    
    const searchRecipes = async (searchTerm) => {
        console.log("SearchItem: "+ searchTerm);
        
        const res = await fetch('http://localhost:3001/search', {
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


    const handleSearch = (val) => {
      console.log(val);
      // setSearch(value)      
      searchRecipes(val)

      console.log(searchRecipe || "")

      navigate('/recipe', { state: { value: val } });
  }


  return (
    <div >
      
     <h2 className=' text-[1.5rem] lg:text-[2rem] font-bold mt-10 tracking-tight text-center lg:text-left'>Popular Categories</h2>

     <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 justify-items-center font-bold'>


        <div className='flex flex-col justify-center items-center ' >
       <img src={breakfast} className='[clip-path:circle()] w-60 h-60 cursor-pointer ' onClick={() => handleSearch('Breakfast')}/>
       <h4 className='text-center' >Breakfast</h4>
       </div>


       <div className='flex flex-col justify-center items-center' >
       <img src={lunch} className='[clip-path:circle()] w-60 h-60 cursor-pointer' onClick={() => handleSearch('Lunch')}/>
       <h4 className='text-center'>Lunch</h4>
       </div>


       <div className='flex flex-col justify-center items-center ' >
       <img src={dinner} className='[clip-path:circle()] w-60 h-60 cursor-pointer' onClick={() => handleSearch('Dinner')}/>
       <h4 className='text-center'>Dinner</h4>
       </div>


       <div className='flex flex-col justify-center items-center' >
       <img src={appetizer} className='[clip-path:circle()] w-60 h-60 cursor-pointer' onClick={() =>handleSearch('Appetizer')}/>
       <h4 className='text-center'>Appetizer</h4>
       </div>


       <div className='flex flex-col justify-center items-center ' >
       <img src={salad} className='[clip-path:circle()] w-60 h-60 cursor-pointer' onClick={() => handleSearch('salad')}/>
       <h4 className='text-center'>Salad</h4>
       </div>


       <div className='flex flex-col justify-center items-center ' >
       <img src={pizza} className='[clip-path:circle()] w-60 h-60 cursor-pointer' onClick={() => handleSearch('pizza')}/>
       <h4 className='text-center'>Pizza</h4>
       </div>

       <div className='flex flex-col justify-center items-center' >
       <img src={pasta} className='[clip-path:circle()] w-60 h-60 cursor-pointer' onClick={() => handleSearch('pasta')}/>
       <h4 className='text-center'>Pasta</h4>
       </div>

       <div className='flex flex-col justify-center items-center' >
       <img src={smoothie} className='[clip-path:circle()] w-60 h-60 cursor-pointer' onClick={() => handleSearch('smoothie')}/>
       <h4 className='text-center'>Smoothie</h4>
       </div>

     </div>

    </div>
  )
}

export default Category