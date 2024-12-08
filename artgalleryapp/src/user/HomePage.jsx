import React, { useContext, useEffect, useState } from 'react'
import '../css/AdminHome.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Category from './Category';
import { Arr } from '../App';


const HomePage = () => {

  const [navItems,setArr] = useContext(Arr);

  const [arr, setarr] = useState([]);

  const [search, setSearch] = useState([]);

  const navigate = useNavigate();

      useEffect(()=>{
        setArr(['home', 'booking', 'cart', 'profile' , 'logout']);
          // renderArts();
      },[]);

  const renderArts = async () =>{
    try{
      var response = await axios.get('http://localhost:8081/art');
      setarr(response.data);
    }
    catch(error){
      console.log(error);
    }
  }


  return (
    <div className='main-home-page'>
      <div className='home-page-img'>
        <div className='content-of-img'>
        <h3 className="heading-h3">Galleries and the art world</h3>
        <p>Welcome to ArtGallery, a vibrant space where art comes to life. Our gallery is dedicated to showcasing a diverse collection of artworks that span various mediums, styles, and eras. Whether you're an avid art collector, a casual observer, or someone looking to be inspired, ArtGallery offers a space for creativity to flourish and for stories to be told through visual expression.</p>
        </div>
        <div className='home-page-img-back'></div>
      </div>
      <div className='arts-shop-main-div'>
        <Category/>
        {/* <div className='search-div'>
      <input type="search" name="search" style={{width:'30%'}} className="addhotel-input login-input" placeholder='Artist Name' onChange={(e)=>setSearch(e.target.value)}/>
      <input type="button" value="Search" className='addhotel-input save' />
      </div>
        <h4 style={{textAlign:'left',marginLeft:'14rem'}}>Arts :</h4>
      <div className='arts-shop-sub-div'>
      {arr?.filter(item => {return search === '' ? item : item.artistName.toLowerCase().includes(search)}).map(item=>(
        <div class='art-div div-cat-op'>
        <img class='arts-image' src={item?.url} alt='not found url' onClick={()=>navigate('/art/'+item.id)} />
              <div class="cat-img-black"></div>
            <h3 style={{"text-decoration" : "none"}} class='artist-name-h1'>{item?.name}</h3>
            <h6 style={{"text-decoration" : "none"}} class='artist-name-h1'>{item?.artistName}</h6>
            </div>
      ))}
      </div> */}
    </div>
    </div>
  )
}

export default HomePage
