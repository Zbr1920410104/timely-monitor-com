import React, { useState } from 'react';

import moment from 'moment';

import { Carousel, Switch, DatePicker, Button } from 'antd';
import '../../../style/home/monitor/home-monitor.styl';
const { RangePicker } = DatePicker;

export default (props) => {
  const [isOpened, setIsOpened] = useState(true),
    [value, setValue] = useState(null);

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

  const disabledDateTime = (dates, partial) => {
    let hours = moment().hours(); //0~23
    let minutes = moment().minutes(); //0~59
    let seconds = moment().seconds(); //0~59

    if (
      dates &&
      moment(dates[0]).date() === moment().date() &&
      partial === 'start'
    ) {
      return {
        disabledHours: () => range(hours + 1, 24),
        disabledMinutes: () => range(minutes + 1, 60),
        disabledSeconds: () => range(seconds + 1, 60),
      };
    }

    //当日只能选择当前时间之后的时间点
    if (
      dates &&
      moment(dates[1]).date() === moment().date() &&
      partial === 'end'
    ) {
      return {
        disabledHours: () => range(hours + 1, 24),
        disabledMinutes: () => range(minutes + 1, 60),
        disabledSeconds: () => range(seconds + 1, 60),
      };
    }
  };

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

  const changeTime = (time) => {
    setValue(time);
  };

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
          disabledTime={disabledDateTime}
          showTime={{
            hideDisabledOptions: true,
            defaultValue: [moment('00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
          }}
          format='YYYY-MM-DD HH:mm'
          disabled={isOpened}
          value={value}
          onChange={(e) => {
            changeTime(e);
          }}
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
