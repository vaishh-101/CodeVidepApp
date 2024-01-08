import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function addUser() {
    console.log('FullName', fullName);
    console.log('Email', email);
    console.log('Password', password);

    await axios.post('/user/signup', {
      fullName: fullName,
      email: email,
      password: password,
    });

    setFullName('');
    setEmail('');
    setPassword('');

    alert('User added successfully!');

    window.location = '/login';
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Signup Form</h2>
          <div className="my-form">
            <div className="mb-3">
              <label htmlFor="inputFullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputFullName"
                placeholder="Enter Your Name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button
              type="button"
              className="btn btn-warning w-100"
              onClick={addUser}
            >
              Create An Account
            </button>
            <Link to="/login" className="d-block mt-3 text-center">
              Already Have an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
