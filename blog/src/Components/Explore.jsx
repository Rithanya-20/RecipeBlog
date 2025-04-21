import React from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeCards from './RecipeCards'
import { useEffect, useState } from 'react'
import axios from 'axios'
function Explore() {

  const navigate = useNavigate()


      const [recipe, setRecipe] = useState([])
  
      
      const getRecipeData = async() => {
          const res = await axios.get("https://inourkitchen.onrender.com/recipe", {
              headers:{
                  "Content-Type":"application/json"
              }
          })
  
          console.log(res);
  
          if(res.data.status === 401 || !res.data){
              console.log("Error");
              
          }
          else{
              setRecipe(res.data.getRecipe)
          }
          
      }
  
  
  
      useEffect(() => {
          getRecipeData()
     
      }, [])
  

  return (
    <div>
     
     <h2 className='font-bold text-[1.5rem] lg:text-[2rem] mt-8 text-center lg:text-left'>Explore Recipes</h2>

     <h4 className='text-[var(--light-brown)] font-bold cursor-pointer text-center lg:text-right' onClick={() => navigate('/recipe')}>View more</h4>

     
     {/* <div className='mt-4'>
        <div className='w-[30vw]'>
            <img className='rounded-t-lg w-full' src={panner} alt='panner'/>

            <div className='bg-[var(--peach)] pt-5 pb-5 rounded-b-lg '> 
                
                <h3 className=' text-center font-bold '>Paneer Butter Masala</h3>
            <span className='px-2 py-1 bg-[var(--sec-dark-brown)] text-white w-auto rounded-md text-[8px] ml-3'>Dinner</span>

            <span className='px-2 py-1 bg-[var(--sec-dark-brown)] text-white w-auto rounded-md text-[8px] ml-3'>Gravy</span>
            </div>
        
        </div>
     </div> */}

<div>

<div>
  {/* <h2 className='font-medium text-[1.3rem] text-[var(--dark-brown)] mt-15'>Recommended Recipes</h2> */}
  <div className='mt-5'>
  <div className='flex flex-wrap gap-2 justify-center lg:justify-start '>

{recipe ? ( recipe.slice(0,4).map( (item) => (
        <div className='w-[200px] lg:w-[350px] shadow-xl rounded-lg overflow-hidden cursor-pointer bg-white'>

        <div onClick={() => navigate('/recipepage/'+item._id)}>

            <RecipeCards value={item}/>
        
        </div>

    </div>
))) : (<></>)}

</div>
    </div>
</div>
</div>

    </div>
  )
}

export default Explore