import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {Table} from 'antd';

import './style.css'

const Products = () => {
  const [token,setToken]= useState('');
  const [cookies,setCookies] = useCookies(['token']);
  const [data,setData]= useState(['']);
  

  const URL_FOR_DATA = 'https://face.ox-sys.com/variations';
  const params = {
    size: 1,
    page: 2,
    stock: {
      exist: true,
      location: [42]
    }
  }
  
  const getData = (token=cookies.token) => {
    axios.interceptors.request.use(
      config=>{
        config.headers.authorization = `Bearer ${token}`;
        return config
      },
      error=>{
        return Promise.reject(error)
      }
    )
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {${token}}`
      }
    };
    axios.get(URL_FOR_DATA, params, config)
      .then(res=>{
        // console.log(res.data);
        setData([...res.data.items])
      })
      .catch(err=> console.log(err))
  }
  useEffect(() => {
    setToken(cookies.token);
    // console.log(cookies.token);
    getData(cookies.token)
   
  }, []);
  const onChangeHandler = (e) =>{

  }
  const columns = [
    {
      title: 'Названые товара',
      dataIndex: 'name',
      width: 150
    }, 
    {
      title: 'Цена товара',
      dataIndex: 'stocks[0].sellPrice.UZS',
      width: 150
    },
    {
      title: 'Фото товара',
      dataIndex: 'images[0].urls.300x_',
      width: 150
    }
  ]
  // console.log(token)
  // console.log(data,'----dataaa')
  return (
    <div className='products'>
      <h1>Hello </h1>
      <input type="text" className="search" placeholder='Поиск товара по имени' onChange={onChangeHandler} />
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} scroll={{ y: 840 }} />
    </div>
  );
}

export default Products;
//Join Zoom Meeting
// https://us05web.zoom.us/j/9923085963?pwd=N3F1a3NZZlRxOER6c1FCYmd1cnNoQT09
// 
// Meeting ID: 992 308 5963
// Passcode: H287SC



