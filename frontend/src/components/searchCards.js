import React from 'react';
import '../styles/searchCard.css';
const searchCards = ({heading,image,name,id,price,category,desc,width}) => {
    console.log(id)
  return (
    <div className='searchCard'>
<div className="leftSearch">

<div style={{fontWeight:"800", fontSize:"0.9rem",width:{width}}}>{name || " "}</div>
<div style={{fontWeight:"600", fontSize:"0.9rem"}}> { price?"₹"+price: " "}</div>
<div style={{fontSize:"0.7rem",color:"gray"}}>{category?.join(' ') || " "}</div>
<div style={{fontSize:"0.6rem" , lineHeight:"13px", wordSpacing:"8px" ,width:"80%",color:"gray"}}>{desc || " "}</div>
</div>
<div className='rightSearch'>
  {image && <>
<img src={image} alt={name} />
<button className="add">Add</button>
</>
  }
</div>

    </div>
  )
}

export default searchCards