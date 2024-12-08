import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/cart.css';
import Loading from '../auth/Loading';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from './cartFiles';

const Booking = () => {

  const [cart, setcart] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(()=>{
    renderCart();
    },[]);

    const nagivate = useNavigate();

  const renderCart = async () =>{
    setloading(true);
    try{
      var response = await axios.get('http://localhost:8081/booking/'+localStorage.getItem('user'));
      setcart(response.data);
      console.log(response);
    }
    catch(error){
      console.log(error);
    }
    setloading(false);
  }

  return (
    <div className='arts-shop-main-div'>
      {loading &&  <Loading/>}
      
      <div className='cart-item-inside'> 
        <h5 className='cart-h5'>Booked Arts : </h5>
        { cart?.length === 0 &&
        <div className='ifCartIsEmpty'>
          <h1>No Arts are Booked Yet</h1>
        </div>
        }
        {cart?.map((item)=>(
          <div class="card w-50 cart-item-div">
            <div onClick={()=>nagivate('/art/'+item.art?.id)} >
              <img src={item?.art?.url}  className='cart-img' ></img>
              </div>
            <div class="card-body" onClick={()=>nagivate('/art/'+item.art.id)}>
              <h5 class="card-title">{item.art.name}</h5>
              <p class="card-text">Cost : ₹{item.art.cost}</p>
              <p class="card-text">Order Date : {item.date}</p>
              <p class="card-text">Delivery Date : {item.deliveryDate}</p>
          </div>
              <div className='cart-button-css'>
              <button href="#" class="btn btn-danger cart-button" onClick={()=>nagivate("/cancelorder/" + item.id)}>Cancel</button>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Booking
