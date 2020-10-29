import React, { useState, useEffect } from 'react';

import moment from 'moment';

// 请求
import proxyFetch from '@/util/request';
import { GET_PICTURE } from '@/constants/api-constants';

import { Carousel, Switch, DatePicker, Skeleton } from 'antd';
import '../../../style/home/monitor/home-monitor.styl';
const { RangePicker } = DatePicker;

export default (props) => {
  const [isOpened, setIsOpened] = useState(true),
    [needRefresh, setNeedRefresh] = useState(true),
    [pictureList, setPictureList] = useState([]),
    [loading, setLoading] = useState(false),
    [value, setValue] = useState(null);

  // 将已有的数据回显
  useEffect(() => {
    if (needRefresh) {
      (async () => {
        setLoading(true);
        let timeData = {};
        if (value) {
          timeData.foreTime = value[0].format('YYYY-MM-DD HH:mm:ss');
          timeData.laterTime = value[1].format('YYYY-MM-DD HH:mm:ss');
        }
        const res = await proxyFetch(
          GET_PICTURE,
          {
            isOpened,
            foreTime: timeData?.foreTime,
            laterTime: timeData?.laterTime,
          },
          'GET'
        );
        if (res) {
          console.log(res);
          setPictureList(res);
        }
        setLoading(false);
      })();
      setNeedRefresh(false);
    }
  }, [needRefresh, isOpened, value]);

  const contentStyle = (url) => {
    let imageUrl = 'http://timely-monitor.oss-cn-beijing.aliyuncs.com/' + url;
    if (!url) {
      return {
        height: '480px',
        color: 'red',
        lineHeight: '20px',
        textAlign: 'left',
        background: '#364d79',
      };
    }
    return {
      height: '480px',
      color: 'red',
      lineHeight: '20px',
      textAlign: 'left',
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: '100% 100%',
    };
  };

  // const range = (start, end) => {
  //   const result = [];
  //   for (let i = start; i < end; i++) {
  //     result.push(i);
  //   }
  //   return result;
  // };

  const disabledDate = (current) => {
    // 无法选择之后的日期
    return current && current > moment().endOf('day');
  };

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
            setNeedRefresh(true);
          }}
        />
      </div>
      <div className='time-select-box'>
        <div className='select-text-box'>时间选择：</div>
        <RangePicker
          disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime={{
            hideDisabledOptions: true,
            defaultValue: [moment('00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
          }}
          format='YYYY-MM-DD HH:mm'
          disabled={isOpened}
          value={value}
          onChange={(e) => {
            changeTime(e);
            setNeedRefresh(true);
          }}
        />
        {/* <Button
          className={isOpened ? 'fail-button' : 'confirm-button'}
          type='primary'
          disabled={isOpened}
        >
          确定
        </Button> */}
      </div>
      <Skeleton loading={loading}>
        <Carousel autoplay effect='fade' className='carousel-box'>
          {pictureList.length ? (
            pictureList.map((picture, index) => {
              return (
                <div key={picture.uuid}>
                  <h2 className='picture' style={contentStyle(picture.newUrl)}>
                    {picture.consumerName}
                    {'   '}
                    {picture.time}
                  </h2>
                </div>
              );
            })
          ) : (
            <div>
              <h2 className='picture' style={contentStyle('')}>
                图片待获取
              </h2>
            </div>
          )}
        </Carousel>
      </Skeleton>
    </div>
  );
};
