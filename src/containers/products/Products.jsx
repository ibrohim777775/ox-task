import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Products = () => {
  const [token,setToken]= useState('');
  const [cookies,setCookies] = useCookies(['token']);

  const URL_FOR_DATA = 'https://face.ox-sys.com/variations';
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer {{${token}}}`
    }
  }
  useEffect(() => {
    setToken(cookies.token);
    // console.log(cookies.token,'products cookie')
    // console.log(token,'products')
  }, []);
  // console.log(token)
  return (
    <div>
      <h1>Hello from products page</h1>
    </div>
  );
}

export default Products;
//Join Zoom Meeting
// https://us05web.zoom.us/j/9923085963?pwd=N3F1a3NZZlRxOER6c1FCYmd1cnNoQT09
// 
// Meeting ID: 992 308 5963
// Passcode: H287SC



