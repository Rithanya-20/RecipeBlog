import React from 'react'


function RecipeCards({value}) {
  // console.log(value.imgpath);

  const tag_String = value.tag[0]
  // console.log(tag_String);
  

  const tag_array = tag_String.split(/,(?!\s)|(?<!\s),/)

  // console.log(tag_array);
  
  
  return (
    <div>

        <div className='  '>
        <img src={`http://localhost:3001/uploads/${value.imgpath}` } className='w-full h-[150px] lg:h-[270px]' alt='images'/>

<div className='p-4 '>
    <p className='font-medium text-sm lg:text-2xl'>{value.title}</p>

    <div className='flex flex-wrap gap-2 mt-2'>

    {           
    tag_array.map((item) => (
         <p className='font-medium text-xs lg:text-[1rem] bg-[var(--light-brown)] text-white rounded-md px-2 py-1'>{item}</p>
    ))}
  
   </div>
   
</div>
        </div>
    </div>
  )
}

export default RecipeCards