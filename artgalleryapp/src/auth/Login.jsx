import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/register.css';
import { Arr } from '../App';
import Loading from './Loading';

const Login = () => {
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(false);
  const [navItems, setArr] = useContext(Arr);

  useEffect(() => {
    localStorage.setItem('token', 'random');
    setArr(['login', 'register']);
  }, []);

  const navigate = useNavigate();

  const set = (e) => setdata({ ...data, [e.target.name]: e.target.value });

  const submitData = async (e) => {
    setloading(true);
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/user/login', data);
      localStorage.setItem('user', response.data.id);
      navigate(response.data.role === 'user' ? '/home' : '/admin');
    } catch (error) {
      if (error.status !== 404) navigate('/verify/' + error.response.data.id);
    }
    setloading(false);
  };

  return (
    <div className="login-page">
      {loading && <Loading />}
      <div className="login-entry-div">
        <h1 className="login-h1">Welcome Back!</h1>
        <p className="login-subtext">Please log in to continue</p>
        <form className="form-class-addhotel" onSubmit={submitData}>
          <input
            type="text"
            className="addhotel-input login-input"
            name="username"
            placeholder="Enter your username"
            onChange={set}
            required
          />
          <input
            type="password"
            className="addhotel-input login-input"
            name="password"
            placeholder="Enter your password"
            onChange={set}
            required
          />
          <div className="login-links">
            <a className="login-a-tag" href="/register">
              Don't have an account? Sign up
            </a>
            <a className="forgot-password" href="/forgot-password">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="addhotel-input save">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
