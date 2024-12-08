
import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/register.css';
import { Arr } from '../App.js';
import Loading from '../auth/Loading.jsx';

const AddCategory = () => {

  const [navItems,setArr] = useContext(Arr);

  useEffect(()=>{
    setArr(['admin', 'addart', 'addcategory', 'logout']);
},[]);

    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const [data , setdata] = useState({});
    const [img , setimg] = useState(null);

    const set = e =>setdata({...data,[e.target.name] : e.target.value});

    const submitData = async (e) => {
        e.preventDefault();
        setloading(true);
          try{
            var res = await axios.post('http://localhost:8081/category', data);
            navigate('/admin');
          }
          catch(error){
            setloading(false);
            // toast.error(error.response.data.message);
            console.log(error);
            
          }
    }

  return (
    <div className='addhotel-div verifcation-div'>
      { loading && <Loading/>}
      <h1 className='login-h1' style={{textAlign:'left', color:'#000'}}>Add Category</h1>
      <form className='form-class-addhotel' onSubmit={submitData}>
            <input type='text' className='addhotel-input' name='category' placeholder='category' onChange={set} required />
          <label style={{display:'block', marginLeft:'20px'}}>Category picture </label>
          <input type='text' className='addhotel-input' name='url' onChange={set} /><br></br>
          <input type='submit' className='addhotel-input save' value='Add Category' />
      </form>
    </div>
  )
}

export default AddCategory
