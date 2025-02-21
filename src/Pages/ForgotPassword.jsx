import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { ServerApi } from '../Components/constants';

function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate()

  useEffect(()=>{
     const id = getCookie("id");
   if(id) {
      navigate("/");
    }
  });

  const changePassword = async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                    alert(error.response.data.error);
            return ;
            });
            const res = await axios.post(`${ServerApi}/user/change/password`, {
                email: email,
                password: password
            })
            return res;
        } catch(err) {
            console.log(err);
            alert("Something went wrong please try again later.")
    }   
  }

  function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return undefined;
}

  const userVerification = async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                    alert(error.response.data.error);
            return ;
            });
            const res = await axios.post(`${ServerApi}/user/verify`, {
                email: email,
                verificationCode: otp
            })
            return res;
        } catch(err) {
            console.log(err);
            alert("Something went wrong please try again later.")
    }   
}


  const getOTP = async(e) => {
    e.preventDefault();
    if(conPassword == password) {
      if(password.length >= 8 && password.length <= 12) {
        const res = await changePassword(email, password);
        if(res) {
          alert(res.data.message);
        }
      } else {
        alert("Password should be 8 to 12 characters long");
      setPassword("");
      setConPassword("");
      }
    } else {
      alert("Password doesnt match");
      setPassword("");
      setConPassword("");
    }
  } 

  const submitHandler = async(e) => {
    e.preventDefault();
    if(conPassword == password) {
      if(!(password.length < 8 && password.length >= 12)) {
        const res = await userVerification(email, otp);
        if(res) {
          alert("Registration Successfull");
          navigate("/login");
        }
      } else {
        alert("Password should be 8 to 12 characters long");
      setPassword("");
      setConPassword("");
      }
    } else {
      alert("Password doesnt match");
      setPassword("");
      setConPassword("");
    }
  }
  return (
<section className="login">
      <div className="login-container">
        <h1>Forgot Password?</h1>
        <form autoComplete="false" onSubmit={e => {submitHandler(e)}}>
          <div className="form-group">
            <input
              type="email"
              className="login-group-input"
              placeholder="Enter your email"
              required
              onChange={e => {setEmail(e.target.value)}}
              value={email}
            />
            <input
              type="password"
              className="login-group-input"
              placeholder="Enter your password Password"
              required
              onChange={e => {setPassword(e.target.value)}}
            />
            <input
              type="password"
              className="login-group-input"
              placeholder="Confirm Password"
              required
              onChange={e => {setConPassword(e.target.value)}}
            />
              <input
              type="text"
              className="login-group-input-otp"
              placeholder="Enter OTP"
              required
               onChange={e => {setOtp(e.target.value)}}
            />
            <button type="button" className='otp-btn' onClick={e => {getOTP(e)}}>Get OTP</button>
            <div className="login-btn">
              <button type="submit" className="login-sign-in">
                Change Password
              </button>
            </div>
          </div>
        </form>
        <div className="remember-me-forget-pass">
          <Link to={"/login"}><span className="forgot">Remember Password? </span><span className="register"> Login</span></Link>
          <Link to={"/register"}>
            <span className="register"> Register</span></Link>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword