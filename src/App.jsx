import { useEffect, useState } from 'react'



function App() {
  const[apistr,updateapistr]=useState([])
  const[pricelist,updatepricelist]=useState([])
  const [home,updatehome]=useState(0)
  const[products,updateproducts]=useState(0)
  const [burgerstat,updateburgerstat]=useState(0)
  const[materialprice,updatematerialprice]=useState(0)
  const[quantity,updatequantity]=useState(1)
  
const price_data= async (url)=>{
  const new_data= await fetch(url)
  const temp_data = await new_data.json()
  return temp_data;
}

useEffect(()=>{
  price_data('/public/price.json').then((data)=>{
    updateapistr(Object.values(data))
    

  })
},[])
  return (
    <div className="main-container">
      <div className="navbar">
        <div className="sub-navbar">
          <button className="hamburger" onClick={()=>{
            if(burgerstat==0){
              updateburgerstat(1);
            }
            else{
              updateburgerstat(0);
            }
            
            }}>
            <div className={(burgerstat==1)?"upper ham":"ham"}></div>
            <div className={(burgerstat==1)?"lower ham":"ham"}></div>
          </button>
          <button className="logo" onClick={()=>updatehome(0)} >
            <a href="#"><img src="./src/assets/logo-final.png" alt="" /></a>
            <div class="logo-name"><button className="logo-btn" ><a href="#">ECOCONV</a></button></div>
            </button>
          <div className="sub-nav-items">
            <button className="home sub-items" onClick={()=>updatehome(0)}><a href="#">Home</a></button>
            <button className="products sub-items" onClick={()=>updatehome(1)}><a href="#">Products</a></button>
            <button className="about sub-items"onClick={()=>updatehome(2)}><a href="#">About</a></button>
          </div>
        </div>
      </div>
     <div className={(burgerstat==1)?"hamburger-nav":"blank"}>
      <button className="ham-home ham-btn" onClick={()=>{
        console.log(burgerstat)
        updateburgerstat(0);
        updatehome(0);
      }}>Home</button>
      <button className="ham-products ham-btn" onClick={()=>{
        updateburgerstat(0);
        updatehome(1);
      }}>Products</button>
      <button className="ham-about ham-btn" onClick={()=>{
        updateburgerstat(0);
        updatehome(2);
      }}>About</button>

     </div>
     <div className={(home==1)?"sub-products":"blank"}>
      {
        apistr.map(data=>(
          <div className="main-product-container">
            <div className="sub-product-container">
               <div className="product-name-pic">
                 <div className="product-name">{data.product.name}</div>
                 <img src={data.product.image} alt="" />
               </div>
               <div className="product-price">
                <div className="grade-name">Grade</div>
                <div className="grade-selection">{
                Object.values(data.product.price).map((new_data,index)=>(
                  <button class={data.product.class} value={new_data} onClick={()=>{
                    updatematerialprice(new_data)
                    updatequantity(1)
                  }}>{index+1}</button>
                ))
                  
                }</div>
                <div className="quantity-price">
                  <button class="add-quantity quantity-btn" onClick={()=>
                      updatequantity(quantity + 1)

                    }>+</button>
                  <div className="price-display">{materialprice*quantity}</div>

                  <button className="subtract-quantity quantity-btn" onClick={()=>{
                    if(quantity>1)updatequantity(quantity - 1)
                    }}>-</button>
                </div>
                <div className="buying-option">
                  <div className="quantity-display">QTY: {quantity}</div>
                  <button class="buy">BUY NOW</button>
                </div>
               </div>
            </div>
          </div>
        ))
      }
   {console.log(materialprice)}
     </div>
      </div>
  )
}

export default App
