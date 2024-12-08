import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/cart.css';
import Loading from '../auth/Loading';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from './cartFiles';

const Cart = () => {

  const [cart, setcart] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(()=>{
    renderCart();
    },[]);

    const nagivate = useNavigate();

  const renderCart = async () =>{
    setloading(true);
    try{
      var response = await axios.get('http://localhost:8081/user/cart/' + localStorage.getItem('user'));
      setcart(response.data);
    }
    catch(error){
      console.log(error);
    }
    setloading(false);
  }

  const removeFromCartItems = async(id) =>{
    setloading(true);
      await removeFromCart(id);
      setloading(false);
      renderCart();
      alert("removed from cart");
  }


  return (
    <div className='arts-shop-main-div'>
      {loading &&  <Loading/>}
      <div className='cart-item-inside'> 
        <h5 className='cart-h5'>Cart Items:</h5>
        { cart?.length === 0 &&
        <div className='ifCartIsEmpty'>
          <h1>Cart is Empty Add item to Cart</h1>
        </div>
        }
        {cart?.map((item)=>(
          <div class="card w-50 cart-item-div">
            <div onClick={()=>nagivate('/art/'+item?.id)} >
              <img src={item.url}  className='cart-img' ></img>
              </div>
            <div class="card-body" onClick={()=>nagivate('/art/'+item?.id)}>
              <h5 class="card-title">{item.name}</h5>
              <p class="card-text">Cost : ₹{item.cost}</p>
          </div>
              <div className='cart-button-css'>
              <button href="#" class="btn btn-warning cart-button" onClick={()=>nagivate("/buy/"+item.id)}>Buy Now</button>
              <button href="#" class="btn btn-danger cart-button" onClick={()=>removeFromCartItems(item.id)}>Remove</button>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
