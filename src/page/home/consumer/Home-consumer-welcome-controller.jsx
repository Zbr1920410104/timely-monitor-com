import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { OCR_TEST } from '@/constants/api-constants';

// 样式
import '@/style/home/consumer/home-consumer-welcome.styl';

export default (props) => {
  const [res, setRes] = useState('');
  useEffect(() => {
    (async () => {
      let num = 0,
        t;
      const screenshots = async () => {
        num++;
        if (num % 4 === 0) {
          return;
        }
        setRes(await proxyFetch(OCR_TEST));
        clearTimeout(t);
        t = setTimeout(() => {
          screenshots();
        }, 3000);
      };

      return screenshots();
    })();
  }, []);

  return (
    <div className='home-consumer-welcome-box'>
      {res ? (
        <audio
          src='/mp3/warning.mp3'
          onEnded={() => {
            setRes('');
          }}
          autoPlay
        >
          <track src='/mp3/warning.mp3' kind='captions' />
        </audio>
      ) : null}
      <img src='/image/monitor.jpg' alt='监控图片' className='home-index-img' />
    </div>
  );
};
