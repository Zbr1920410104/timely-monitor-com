import React, { useState } from 'react';

import moment from 'moment';

import { Carousel, Switch, DatePicker, Button } from 'antd';
import '../../../style/home/monitor/home-monitor.styl';
const { RangePicker } = DatePicker;

export default (props) => {
  const [isOpened, setIsOpened] = useState(true);
  const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '20px',
    textAlign: 'left',
    background: '#364d79',
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  };

  function disabledRangeTime(_, type) {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  }
  const PICTURE_LIST = [
    { time: '2020-10-19 10:20:09', index: 1 },
    { time: '2020-10-19 11:20:09', index: 2 },
    { time: '2020-10-19 12:20:09', index: 3 },
    { time: '2020-10-19 13:20:09', index: 4 },
    { time: '2020-10-19 14:20:09', index: 5 },
    { time: '2020-10-19 15:20:09', index: 6 },
    { time: '2020-10-19 16:20:09', index: 7 },
    { time: '2020-10-19 17:20:09', index: 8 },
    { time: '2020-10-19 18:20:09', index: 9 },
    { time: '2020-10-19 19:20:09', index: 10 },
  ];

  return (
    <div className='home-monitor-box'>
      <p className='title-box'>
        <span>图片监控</span>
      </p>
      <div className='time-switch-box'>
        <div className='switch-text-box'>展示最新10张监控图片 </div>
        <Switch
          defaultChecked
          onChange={(e) => {
            setIsOpened(e);
          }}
        />
      </div>
      <div className='time-select-box'>
        <div className='select-text-box'>时间选择：</div>
        <RangePicker
          disabledDate={disabledDate}
          disabledTime={disabledRangeTime}
          showTime={{
            hideDisabledOptions: true,
            defaultValue: [
              moment('00:00:00', 'HH:mm:ss'),
              moment('11:59:59', 'HH:mm:ss'),
            ],
          }}
          format='YYYY-MM-DD HH:mm:ss'
          disabled={isOpened}
        />
        <Button
          className={isOpened ? 'fail-button' : 'confirm-button'}
          type='primary'
          disabled={isOpened}
        >
          确定
        </Button>
      </div>
      <Carousel autoplay effect='fade' className='carousel-box'>
        {PICTURE_LIST.map((picture, index) => {
          return (
            <div key={picture.index}>
              <h2 style={contentStyle}>{picture.time}</h2>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
