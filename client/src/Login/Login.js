import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ImgLock from './lock.png';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('email') && localStorage.getItem('fullName')) {
      navigate('/dashboard');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function checkLogin() {
    const response = await axios.post('/user/login', {
      email: email,
      password: password,
    });
    if (response.data.status === 'success') {
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('fullName', response.data.user.fullName);

      Swal.fire({
        title: 'Success!',
        text: 'Login Success🤗...',
        icon: 'success',
      });
      navigate('/dashboard');
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Login Failed...😭',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  }

  return (
    <div className='container'>
      <div className='title-container'>
        <h1 className='text-center'>Login</h1>
      </div>

      <div className='admin-login'>
        <img src={ImgLock} className='img-lock' alt='lock' />
        <form>
          <div className='mb-4'>
            <label htmlFor='userEmail' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              id='userEmail'
              placeholder='name@example.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='userPassword' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='userPassword'
              placeholder='password@123'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <button
              type='button'
              className='custom-btn btn-lg btn-login'
              onClick={checkLogin}
            >
              Login
            </button>
          </div>
          <Link to='/signup'>Create an Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
