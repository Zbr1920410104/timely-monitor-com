import React from 'react';
import '@/style/index.styl';

// 样式
import { EyeFilled } from '@ant-design/icons';

// 组件
import LoginComponent from '@/components/index/Login.jsx';

export default (props) => {
  return (
    <div className='index-box'>
      <div className='index-inner-box'>
        <div className='title-box'>
          <EyeFilled />
          {'   '}屏幕监测管理平台
        </div>
        <LoginComponent />
      </div>
    </div>
  );
};

