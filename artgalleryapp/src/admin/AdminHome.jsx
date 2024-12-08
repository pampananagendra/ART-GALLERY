import React, { useContext, useEffect } from 'react'
import '../css/AdminHome.css';
import '../css/popupwindow.css';
import { Arr } from '../App.js';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminHome = () => {

  var id ;
  const [navItems,setArr] = useContext(Arr);
  const [arr, setarr] = useState([]);
  const [categorys, setcategory] = useState([]);

  const nagivate = useNavigate();
  const [popup, setpopup] = useState(false);

  const closePopUp = () => setpopup(false);
  const openPopUp = (e) => {
    id = e.target.name;
    setpopup(true);
  }
  
  useEffect(()=>{
      setArr(['admin','arts' , 'addart', 'addcategory', 'logout']);
      renderCategories();
      // renderArts();
  },[]);

  const renderCategories = async () =>{
    try{
      var response = await axios.get('http://localhost:8081/category');
      setcategory(response.data);
    }
    catch(error){
      console.log(error);
    }
  }

  const deleteArt = async() =>{
    closePopUp();
    try{
      await axios.delete('http://localhost:8081/art/'+ id);
      alert("successfully delete")
      // renderArts();
    }
    catch(error){
      console.log(error);
    }

  }


  return (
    <div className='arts-shop-main-div'>
      
      <div className='search-div'>
      <input type="search" name="search" style={{width:'30%'}} className="addhotel-input login-input" placeholder='Artist Name'/>
      <input type="button" value="Search" className='addhotel-input save' />
      </div>
      <div className='arts-shop-sub-div'>
      {categorys?.map(item =>(
        <div class='art-div div-cat-op'>
        <img class='arts-image' src={item?.url} alt='not found url' />
              <div class="cat-img-black"></div>
            <h3 style={{"text-decoration" : "none"}} class='artist-name-h1'>{item?.category}</h3>
            </div>
      ))}
      </div>
    </div>
  )
}

export default AdminHome
