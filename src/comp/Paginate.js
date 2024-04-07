import React, { useState } from 'react'

const Paginate = ({length, pageHandler,itemsPerPage,currentPage}) => {
  let [currentstep, setcurrentstep] = useState(currentPage)
  let noOfPages= Math.ceil(length/itemsPerPage)
 let arr =[];
 for(let i=1; i<=noOfPages;i++){
  arr.push(i)
 }

 
console.log('cu' , currentPage)
  return (
    <div className='paginate-container'>
      {
        arr.map((el,i)=>{
          
          return(
            <span key={i} className={currentstep === el ? "active" : ""}>
            <a href='#' onClick={()=>pageHandler(el)}>{el}</a>
            </span>
          )

          
        })
      }
    </div>
  )
}

export default Paginate
