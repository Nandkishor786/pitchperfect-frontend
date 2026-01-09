import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//to open popup on clicking on signup button
// and if we click on outside anywhere it automatcally closed
const SignupDropdown = () => {
  const [open,setOpen] =useState(false)
  const navigate= useNavigate()
  const ref = useRef(null)


    // Close when clicking outside
   useEffect(() => {
    const handleClickOutside = (e) => {
      // ref.current = actual DOM element
      // ref points to your dropdown container
      // e.target-The exact element that was clicked
      //Agar dropdown exist karta hai AUR click dropdown ke bahar hua ha
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);  //popup close hoga
      }
    };
    //Detect clicks anywhere on the screen
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside); //cleanup remove the event listner
  }, []);

  return (
    //relative-this div is become container for dropdwon(absolute) it nearest it
    <div ref={ref} className='relative '>
       {/* sign up */}
      <button 
        onClick={()=>setOpen(true)}
        className="text-sm  max-sm:hidden flex items-center gap-2  bg-primary text-white px-6 py-2 rounded-full cursor-pointer transition-all hover:bg-indigo-800 hover:text-white/70 ">  
          Sign Up
        </button>  
    
        {/* DROPDOWN */}
        {/* when open ho  */}
         {open&&(
          //absolute-it remains nearest(relative) to parent(relative)
          //right-0: sign button ke aligined
           <div className='absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-lg z-50'>
               <button 
               onClick={()=> {
                 setOpen(false);
                navigate("/signup?role=founder") 
              }}
               className=' w-full text-left px-4 py-3 hover:text-primary rounded-t-xl hover:bg-gray-100'>
                I’m a Founder
                </button>   
                <button
                 onClick={()=>{
                   setOpen(false);
                   navigate("/signup?role=investor") 
                 }}
                 className=' w-full text-left px-4 py-3 hover:bg-gray-100 rounded-t-xl hover:text-primary '
                >
                  I’m an Investor
                </button>
           </div>
             
         )}
    </div>
  )
}

export default SignupDropdown
