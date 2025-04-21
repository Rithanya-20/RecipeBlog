import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";
import CheckboxList from './Dummy';
import DynamicInputs from './Dummy';
import axios from 'axios'

function Create() {

 const navigate = useNavigate()

 const tags = ["Breakfast", "Lunch", "Dinner", "Gravy", "Bread", "Noodles", "Rice","Appetizer", "salad", "Pizza", "Pasta", "Smoothie", "Dessert", "Hot Drink", "Tiffin", "Others"]
  
 const [title, setTitle] = useState()
//  const [tag, setTag] = useState()
 const [ingredients, setIngredients] = useState([""])
 const [method, setMethod] = useState([""])
 const [checkedItems, setCheckedItems] = useState([])
 const [file, setFile] = useState()
 const [youtube, setYoutube] = useState()
 const [img, setImg] = useState()
 const [description, setDescription] = useState() 
 const [author, setAuthor] = useState()

 

 
 const [date, setDate] = useState()

 
 


 const textareaRef = useRef(null)

 useEffect(() => {
  const today = new Date()
  const dateString = today.toLocaleDateString();
  setDate(dateString)
 }, [])

 
 useEffect(() => {
  if(textareaRef.current) {
    textareaRef.current.style.height
 = "auto"
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"  }
 }, [description])


 function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0])
    setImg(URL.createObjectURL(e.target.files[0]));
}

const handleCheckboxChange = (value) => {
  setCheckedItems( (prev) =>
  prev.includes(value) ? prev.filter( (item) => item !== value) : [...prev, value])
}

const handleIngredient = (index, value) => {
  const newInputs = [...ingredients]
  newInputs[index] = value
  setIngredients(newInputs)
}

const addIngredient = (e) => {
  e.preventDefault()
  setIngredients((prev) => [...prev, ""])
}

const handleMethod = (index,value) => {
  const newInput = [...method]
  newInput[index] = value
  setMethod(newInput)
}

const addMethod = (e) => {
  e.preventDefault()
  setMethod((prev) => [...prev, ""])
}

const handleYoutube = (value) => {
  // var input = value
  // var embedLink = input.replace("watch?v=","embed/")
  setYoutube(value)

}

 const handleSubmit = async(e) => {
    e.preventDefault()

    // console.log((e.target.value).json);
    
    var formData = new FormData()

    formData.append("photo", file)
    formData.append("title", title)
    formData.append("ingredients", ingredients)
    formData.append("method", method)
    formData.append("tag", checkedItems)
    formData.append("description", description)
    formData.append("youtube",youtube)
    formData.append("author", author)
    formData.append("date", date)

    console.log(formData);
    

    const config = {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    }


    const res = await axios.post("https://inourkitchen.onrender.com/create", formData, config)

    console.log(res);

    if(res.data.status == 401 || !res.data){
      console.log("Error")
    }else{
      alert("Recipe Created!")
      navigate('/recipe')
    }
    


    // axios.post('https://inourkitchen.onrender.com/create',{title, ingredients, method, file, checkedItems, youtube}, config)
    //        .then(res => {console.log(res)
    //         alert("Recipe Created!")
    //        navigate('/recipe')}
    //        )
    //        .catch(err => {console.log(err.response.data)
    //         alert("Recipe not Created!")
    //          navigate('/recipe')}
    //        )
    
    
    
    // navigate('/recipe')
    
    
 }
  

  return (
    <div>
        <h2 className='text-[var(--dark-brown)] font-bold text-[2rem]'>Create new Recipe</h2>


        <div>
            <form onSubmit={handleSubmit} className='flex flex-col '>

            <p className='pt-10 pb-2 text-[1.5rem] text-[var(--dark-brown)] font-bold'>Title</p>
            
            <input type='text' id='title' name='title' onChange={(e) => setTitle(e.target.value)} value={title || ""}  placeholder='Title...' className='p-4 outline-none border border-gray-300 rounded-md focus:ring-2 ring-[var(--dark-brown)] w-[100%] text-[1.2rem]'></input>

            <p className='pt-10 pb-2 text-[1.5rem] text-[var(--dark-brown)] font-bold'>Recipe Image</p>
            
            <input type="file" name='photo' onChange={handleChange} className='border-2 border-[var(--light-brown)] p-3 text-[var(--light-brown)] font-medium rounded-md cursor-pointer mt-5 mb-3 w-[20rem]
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-[var(--light-brown)] file:text-white
             hover:file:bg-[var(--dark-brown)] file:cursor-pointer' />

            {file ?
            
              (<img width={'150vw'}  height={'150vh'} src={img} />) : (<></>)}
            
            


            <p className='pt-10 pb-2 text-[1.5rem] text-[var(--dark-brown)] font-bold'>Tags</p>

            {/* <CheckboxList/> */}

            <div className='flex flex-wrap bg-white opacity-90 pt-3 pb-3 rounded-lg'>

            {tags.map( (item) => (
             
              <div className='w-1/2 md:w-1/4 mt-2'>
              <label key={item} className='flex items-center space-x-2 font-medium text-[var(--dark-brown)]' >
                
                <input 
                type='checkbox'
                value={item}
                checked={checkedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className='form-checkbox h-5 w-5 accent-[var(--dark-brown)] cursor-pointer '/>
                <span>{item}</span>
              </label>
              </div>
            ))}

          </div>


          {checkedItems.length > 0 ?            
            
         ( <div className='flex flex-wrap gap-2 mt-5'>

          {
            checkedItems.map((item) => (
              <div className='bg-[var(--dark-brown)] rounded-md text-white px-2 py-1 font-medium'>{item}</div>
            ))
            
          }
            
          </div>) : (<p className='mt-3 text-gray-400'>Select a tag that represents your Recipe...</p>)}


            <p className='pt-10 pb-2 text-[1.5rem] text-[var(--dark-brown)] font-bold'>Ingredients</p>

            
            {
              ingredients.map( (value, index) => (
                <input
                  key={index}
                  type='text'
                  value={value}
                  className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[var(--light-brown)] mt-3 w-full'
                  onChange={(e) => handleIngredient(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}

                />

               

              ))
            }

            <button className='border-2 px-3 py-2 text-[var(--dark-brown)] font-medium rounded-md cursor-pointer mt-5 mb-3 w-[6rem]' onClick={addIngredient}>Add</button>




            <p className='pt-10 pb-2 text-[1.5rem] text-[var(--dark-brown)] font-bold'>Instructions</p>

            

         
            {
              method.map((value, index) => (
                <div className='mt-3 w-full'>
                
                

                <span className='font-medium bg-[var(--dark-brown)] text-white px-3 py-1 rounded-md '>{index + 1}</span>
                <input
                type='text'
                value={value}
                placeholder={`Step ${index + 1}`}
                className=' p-2 border border-gray-300 mt-3 rounded-md outline-none focus:ring-2 ring-[var(--light-brown)] w-full '

                onChange={(e) => handleMethod(index,e.target.value)}
                />
                </div>
              ))
            }

            <button className='border-2 px-3 py-2 text-[var(--dark-brown)] font-medium rounded-md cursor-pointer mt-5 mb-3 w-[6rem]' onClick={addMethod}>Add</button>
            
            <p className='pt-10 pb-2 text-[1.5rem] text-[var(--dark-brown)] font-bold'>Description</p>
            
            <textarea type='text' id='description' name='description' 
            ref={textareaRef}
            onChange={(e) => setDescription(e.target.value)} value={description || ""}  placeholder='Description...' className='p-4 resize-none overflow-hidden outline-none border border-gray-300 rounded-md focus:ring-2 ring-[var(--dark-brown)] w-[100%] text-[1.2rem]'
            rows={1}
              ></textarea>            
            
            
            
            
            
            
            <p className='pt-10 pb-2 text-[1.5rem] text-[var(--dark-brown)] font-bold'>YouTube</p>

            <input
                type='text'
                value={youtube}
                placeholder="Link..."
                className=' p-2 border border-gray-300 mt-3 rounded-md outline-none focus:ring-2 ring-[var(--light-brown)] w-full '

                onChange={(e) => handleYoutube(e.target.value)}
                />

  
              <p className='pt-10 pb-2 text-[1.5rem] text-[var(--dark-brown)] font-bold'>Author Name</p>
            
            <input type='text' id='Aname' name='Aname' onChange={(e) => setAuthor(e.target.value)} value={author || ""}  placeholder='Nick name...' className='p-4 outline-none border border-gray-300 rounded-md focus:ring-2 ring-[var(--dark-brown)] w-[100%] text-[1.2rem]'></input>


            <button className='border-2 p-3 bg-[var(--dark-brown)] text-white font-medium rounded-md cursor-pointer mt-5 mb-3 w-[6rem]' type='submit'>CREATE</button>


            </form>
        </div>
        
    </div>
  )
}

export default Create