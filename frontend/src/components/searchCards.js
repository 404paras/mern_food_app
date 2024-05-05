import React from 'react';
import '../styles/searchCard.css';
const searchCards = ({heading,image,name,id,price,category,desc}) => {
    console.log(id)
  return (
    <div className='searchCard'>
<div className="leftSearch">

<div style={{fontWeight:"800"}}>{name}</div>
<div style={{fontWeight:"600"}}>₹ {price}</div>
<div style={{fontSize:"0.7rem",color:"gray"}}>{category.join(' ')}</div>
<div style={{fontSize:"0.6rem" , lineHeight:"13px", wordSpacing:"10px" ,width:"80%",color:"gray"}}>{desc}</div>
</div>
<div className='rightSearch'>
<img src={image} alt={name} />
<button className="addButton">Add</button>
</div>

    </div>
  )
}

export default searchCards