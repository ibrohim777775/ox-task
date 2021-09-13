import axios from 'axios';
import {FaUserAlt, FaArrowRight} from 'react-icons/fa';
import {RiKeyFill} from 'react-icons/ri';
import './style.css';


import React, { useState } from 'react';

const SUBDOMAIN = 'face';
const URL_FOR_AUTH = `https://${SUBDOMAIN}.ox-sys.com/security/auth_check`;

//  https://${SUBDOMAIN}.ox-sys.com/security/auth_check
const Auth = () => {
  const [items, setItems] = useState({login:'', password: ''});
  const [error, setError] = useState(false)

  const submitHandler = (e,button) =>{
    if (button) e.preventDefault() ;
    console.log(items)
    const params = new URLSearchParams()
    params.append('_username', items.login);
    params.append('_password',items.password);
    params.append('_subdomain', 'face');
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post(
      URL_FOR_AUTH,params,config
    )
    .then(res=>{
      console.log(res.data)
      if (res.status === 200){
        console.log('avtorizatsiyadan otdingiz')
      }else{
        setError(!error)
      }
      console.log(error)
    })
    .catch(err=> {
      console.log(err)
      setError(true)
    })
  }
  const onChangeHandler = (e)=>{
    setError(false)
    setItems({...items, [e.target.name]: e.target.value});
    // console.log(items)
  }
  const keyPressHandler = (e) =>{
    // console.log(e.code)
    if (e.code === 'Enter'){
      submitHandler()
    }
  }
  
  return (
    <div className='auth'>
      <div className="auth__main">
        <form  className="auth__form">
          <div className="form__group">
            <FaUserAlt className='user-icon'/>
            <input name='login' onChange={onChangeHandler} type="text" className="form__input" placeholder='Имя ползователья'  />
          </div>
          <div className="form__group">
            <RiKeyFill className='key-icon'/>
            <input name='password' onChange={onChangeHandler} onKeyPress={keyPressHandler} type="password" className="form__input" placeholder='Пароль' />
          </div>
          <button onClick={(e)=>submitHandler(e,true)} type='submit' className="form__button">
            <FaArrowRight/> 
          </button>
          <p className="error">{error ? 'Неверный логин или пароль' : ''}</p>
        </form>
      </div>
      <div className="auth__top"></div>
      <div className="auth__bottom"></div>
    </div>
  );
}

export default Auth;