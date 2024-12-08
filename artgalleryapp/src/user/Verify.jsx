import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../auth/Loading';
import { Arr } from '../App';

const Verify = () => {
    const [, setarr] = useContext(Arr);
    const navigate = useNavigate();
    const [data , setdata] = useState({});
    const [loading, setloading] = useState(false);

    useEffect(() => {
      setarr(['login', 'register']);
    }, []);

    const set = e =>setdata({...data,[e.target.name] : e.target.value});

    let param = useParams();

    const submitData = async (e) =>{
        e.preventDefault();
        setloading(true);
        try{
            data['id'] = param.id;
            var res = await axios.post('http://localhost:8081/user/verify', data);
            navigate('/login');
          }
          catch(error){
            setloading(false);
            alert(error.response.data.message);
          }
    }

    const sendOTP = async ()=>{
      setloading(true);
        data['otp'] = '';
        data['id'] = param.id;
        try{
            data['id'] = param.id;
            var res = await axios.post('http://localhost:8081/user/verify', data);
            setloading(false);
            alert('otp sent...');
          }
          catch(error){
            setloading(false);
            console.log(error.response);
            alert(error.response.data.message);
          }
    }


  return (
    <div className='addhotel-div verifcation-div'>
      { loading && <Loading/>}
    <h1 className='login-h1' style={{textAlign:'left', color:'#000'}}>Verification</h1>
        <form className='form-class-addhotel' onSubmit={submitData}>
            <input type='email' className='addhotel-input' name='email' placeholder='Email Id' onChange={set} required />
            <div className='flex-div' >
            <input type='text' className='addhotel-input' name='otp' style={{width:"24%"}} placeholder='OTP' onChange={set} required />
            <input type='button' className='addhotel-input save' value='Get OTP' onClick={sendOTP} />
            </div>
            <input type='submit' className='addhotel-input save' value='Verify' />
            </form>
    </div>
  )
}

export default Verify
