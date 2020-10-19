import React from 'react';
import '@/style/index.styl';

// 样式
import { DesktopOutlined } from '@ant-design/icons';

// 组件
import LoginComponent from '@/components/index/Login.jsx';

export default (props) => {
  return (
    <div className='index-box'>
      <div className='index-inner-box'>
        <div className='left-box'>
          <img className='image-background' src='/image/left.jpg' alt='Paris' />
          <div className='text-box'>
            <p className='main-describe'>欢迎使用</p>
            <p className='main-describe'>不良信息</p>
            <p className='main-describe'>实时监测系统</p>
            <p className='sub-describe'>
              定时截屏，抓取不良信息，净化网络风气！
            </p>
          </div>
        </div>
        <div className='right-box'>
          <h1 className='logo'>
            <DesktopOutlined />
            <span>{'  '}OCR监测系统</span>
          </h1>
          <div className='form'>
            <LoginComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
