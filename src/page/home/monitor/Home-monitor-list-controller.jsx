import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  OCR_TEST,
  GET_MONITOR_LIST,
  GET_FILE_URL,
} from '@/constants/api-constants';

// redux
// import { useDispatch, useSelector } from 'react-redux';
// import userAction from '@/redux/action/user';

import { Table, Button, Select } from 'antd';
import '../../../style/home/monitor/monitor-list.styl';
const { Column } = Table,
  { Option } = Select;

export default (props) => {
  const [monitorLoading, setMonitorLoading] = useState(false),
    [monitorList, setMonitorList] = useState([]),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [monitorNumber, setMonitorNumber] = useState(1);
  const clickToTest = async () => {
    await proxyFetch(OCR_TEST, { monitorNumber });
    setMonitorLoading(true);
    setTimeout(() => {
      setIsNeedRefresh(true);
    }, 5000 * monitorNumber);
  };

  // 将已有的数据回显
  useEffect(() => {
    if (isNeedRefresh) {
      (async () => {
        setMonitorLoading(true);
        const res = await proxyFetch(GET_MONITOR_LIST, {}, 'GET');
        if (res) {
          setMonitorList(res);
        }
        setMonitorLoading(false);
      })();
      setIsNeedRefresh(false);
    }
  }, [isNeedRefresh]);

  const getFileUrl = async (url) => {
    const res = await proxyFetch(GET_FILE_URL, { url }, 'GET');
    window.open(res);
  };

  return (
    <div className='home-monitor-list-box'>
      <p className='title-box'>
        <span>监控列表</span>
      </p>
      <div className='button-box'>
        <div style={{ paddingRight: '18px', fontSize: '16px', margin: 'auto' }}>
          请选择监测次数:
        </div>
        <Select
          defaultValue={monitorNumber}
          onChange={(e) => setMonitorNumber(e)}
          size='large'
          className='select'
        >
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={5}>5</Option>
          <Option value={10}>10</Option>
        </Select>
        <Button
          className='button'
          size='large'
          type='primary'
          onClick={clickToTest}
        >
          开始监测
        </Button>
      </div>
      <Table
        dataSource={monitorList}
        className='table'
        loading={monitorLoading}
        rowKey={(record) => record.uuid}
        scroll={{ x: 900 }}
      >
        <Column align='center' title='时间' dataIndex='time' key='' />
        <Column
          align='center'
          title='是否存在黑名单关键词'
          dataIndex='isViolate'
          key=''
          render={(text, record) => {
            return record.isViolate === 1
              ? '存在'
              : record.isViolate === 0
              ? '不存在'
              : '未检测';
          }}
        />
        <Column
          align='center'
          title='查看原图'
          dataIndex='originUrl'
          key=''
          render={(text, record) => {
            return (
              <Button
                type='link'
                onClick={() => {
                  getFileUrl(text);
                }}
              >
                查看原图
              </Button>
            );
          }}
        />
        <Column
          align='center'
          title='查看监测图片'
          dataIndex='newUrl'
          key=''
          render={(text, record) => {
            return (
              <Button
                type='link'
                onClick={() => {
                  getFileUrl(text);
                }}
              >
                查看监测图片
              </Button>
            );
          }}
        />
      </Table>
    </div>
  );
};
