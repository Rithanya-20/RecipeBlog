import React from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import RecipeCards from '../Components/RecipeCards'
import { CgProfile } from "react-icons/cg";
import { SlCalender } from "react-icons/sl";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { FaYoutube } from "react-icons/fa";



function RecipePage() {
  const navigate = useNavigate()

   const {id}  = useParams()
   const [recipeItem, setRecipeItem] = useState([])
   
      const [tagItem, setTagItem] = useState([])
      const [recipe, setRecipe] = useState([])
      const [ingItem, setIngItem] = useState([])
      const [methodItem, setMethodItem] = useState([]) 
      const [start, setStart] = useState()
      const [stop, setStop] = useState()

      let rec_length = 0
     

      const getRecipeById = async() => {
        const res = await axios.get(`http://localhost:3001/recipepage/${id}`,{
          headers:{
              "Content-Type":"application/json"
          }
      })

        console.log(res.data.recipeById);

        if(res.data.status === 401 || !res.data){
          console.log("Error");
          
      }
      else{
          setRecipeItem(res.data.recipeById)

          const tag_String = res.data.recipeById.tag[0]
          console.log(tag_String);
          
        
          const tag_array = tag_String.split(/,(?!\s)|(?<!\s),/)
        
          console.log(tag_array);
          setTagItem(tag_array)
    
          const ing_String = res.data.recipeById.ingredients[0]
          console.log(ing_String);
          
        
          const ing_array = ing_String.split(/,(?!\s)|(?<!\s),/)
        
          console.log(ing_array);
          setIngItem(ing_array)
    
    
          const method_String = res.data.recipeById.method[0]
          console.log(ing_String);
          
        
          const method_array = method_String.split(/,(?!\s)|(?<!\s),/)
        
          console.log(method_array);
          setMethodItem(method_array)

          


      }
        // setRecipeItem(res.data.recipeById)
        
      }



        
   
      
      const getRecipeData = async() => {
          const res = await axios.get("http://localhost:3001/recipe", {
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

             rec_length = res.data.getRecipe.length

             const max = rec_length - 5;
             const randomIndex = Math.floor(Math.random() * max);
             
             setStart(randomIndex)
             setStop(randomIndex + 4)
             
          }
          
      }
  
  
  
      useEffect(() => {      

         
          getRecipeData()
          getRecipeById()


          
          
     
      }, [id])



  
  
  const handleHome = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const handleRecipe = (e) => {
    e.preventDefault()
    navigate('/recipe')
  }

  console.log(rec_length);
  console.log(start + " "+ stop);
  


  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-30 justify-between '>
    
    <div className='justify-self-center '>


    
<div className='flex flex-row justify-between items-center'>
<p className='text-[grey]'><span onClick={handleHome} className='cursor-pointer'>Home</span> &gt; <span onClick={handleRecipe} className='cursor-pointer'>Recipe</span> &gt; <span className='text-[var(--dark-brown)] font-bold'>{recipeItem.title}</span></p>

</div>

<div className='mt-5'>
<div className='flex flex-wrap gap-3 mb-2 items-center'>
  <h2 className='font-bold text-[2rem] text-[var(--dark-brown)]'>{recipeItem.title}</h2>

  <div className='flex flex-wrap gap-2 mt-2'>
  {           
tagItem.map((item) => (
   <p className='font-medium text-[1rem] bg-[var(--light-brown)] text-white rounded-md px-2 py-1'>{item}</p>
))}

</div>
</div> 
  
<div className='flex gap-3 flex-wrap'>
    <div className='flex items-center gap-2'>
      <CgProfile size={20} color='var(--dark-brown)'/>
      <span>{recipeItem.author}</span>
    </div>
    <div className='flex items-center gap-2'>
      <SlCalender size={20} color='var(--dark-brown)'/>
      <span>{recipeItem.date}</span>
    </div>
    <div className='flex items-center gap-2'>
          <a 
  href={recipeItem.youtube}        target="_blank" 
  rel="noopener noreferrer"
  className="cursor-pointer"
>
      <FaYoutube size={25} color='red'/>
      </a>
      {/* <span>Apr 12, 2025</span> */}
    </div>
  </div>

  <img src={`http://localhost:3001/uploads/${recipeItem.imgpath}` } className='w-[300px] lg:w-[20rem] h-[290px] lg:h-[20rem] mt-5 rounded-lg'/>

  {/* <p className='mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}

  <div className='mt-5'>
  <h2 className='font-medium text-[1.5rem] mt-5 text-[var(--dark-brown)]'>Description</h2>

 
   <p className='font-medium mt-3 lg:w-[500px]'>{recipeItem.description}</p>


   </div>

  <h3 className='font-medium text-[1.5rem] mt-5 text-[var(--dark-brown)]'>Ingredients</h3>
  <div className='mt-3'>
   
    {           
ingItem.map((item, i) => (
<>
{/* <div className='flex gap-1 items-center mb-1'>
   <p className='bg-[var(--dark-brown)] text-white px-3 py-1 rounded-md '>{i+1}</p><span>{item}</span>
 </div> */}

<div className='flex gap-1 items-center mb-1'>
  <div className='bg-[var(--sec-dark-brown)] text-white px-4 py-1 rounded-md w-[50px] text-center'>
    {i+1}
  </div>

  <div className='ml-2'>
    {item}
  </div>

  </div>

 </>
))}
  </div>


  <h3 className='font-medium text-[1.5rem] mt-5 text-[var(--dark-brown)]'>Instructions</h3>
  <div className='mt-3'>
   
   { methodItem.map((item, i) => (
  <div className='flex gap-1 items-center mb-1'>
  <div className='bg-[var(--light-brown)] text-white px-4 py-1 rounded-md w-[50px] text-center'>
    {i+1}
  </div>

  <div className='ml-2'>
    {item}
  </div>
</div>



))}
  </div>


  
</div>

</div>

      <div className=''>

        <div  >
          <h2 className='font-medium text-[1.3rem] text-[var(--dark-brown)] mt-5 lg:mt-15 text-center lg:text-left'>Recommended Recipes</h2>
          <div className='mt-5 flex flex-wrap gap-2 justify-center lg:justify-start'>
            

                {
                
               
                
                recipe ? ( recipe.slice(start,stop).map( (item) => (

                 <>
                 { item._id !== recipeItem._id ? (
                   <div className='w-[200px] lg:w-[330px] shadow-xl rounded-lg overflow-hidden cursor-pointer mb-2 bg-white'>

                   <div onClick={() => navigate('/recipepage/'+item._id)}>

                       <RecipeCards value={item}/>

                   
                   
                   </div>

               </div>
                 ) : (console.log("ID Matched")
                 )}
                       

             </>
                ))) : (<></>)}
                
            </div>
        </div>
      </div>
    </div>
  )
}

export default RecipePage