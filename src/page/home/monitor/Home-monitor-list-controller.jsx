import React from 'react';

// 请求
import proxyFetch from '@/util/request';
import { OCR_TEST } from '@/constants/api-constants';

import { Table, Button } from 'antd';
import '../../../style/home/monitor/monitor-list.styl';
const { Column } = Table;

export default (props) => {
  const clickToTest = async () => {
    const res = await proxyFetch(OCR_TEST);
    console.log('====================================');
    console.log(res);
    console.log('====================================');
  };
  const accountList = [
    {
      uuid: '1213241',
      time: '2020-10-19 10:20:00',
      isViolate: null,
      originUrl: '',
      newUrl: '',
    },
    {
      uuid: '1213242',
      time: '2020-10-19 11:20:00',
      isViolate: 1,
      originUrl: '',
      newUrl: '',
    },
    {
      uuid: '1213243',
      time: '2020-10-19 12:20:00',
      isViolate: 0,
      originUrl: '',
      newUrl: '',
    },
    {
      uuid: '1213244',
      time: '2020-10-19 13:20:00',
      isViolate: 1,
      originUrl: '',
      newUrl: '',
    },
    {
      uuid: '1213245',
      time: '2020-10-19 14:20:00',
      isViolate: 0,
      originUrl: '',
      newUrl: '',
    },
  ];
  return (
    <div className='home-monitor-list-box'>
      <p className='title-box'>
        <span>监控列表</span>
      </p>
      <Table
        dataSource={accountList}
        className='table'
        // loading={accountLoading}
        rowKey={(record) => record.uuid}
        scroll={{ x: 900 }}
        // expandedRowRender={expandedRowRender}
      >
        <Column
          align='center'
          title='时间'
          dataIndex='time'
          key=''
          // fixed='left'
        />
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
          render={() => {
            return (
              <Button type='link' onClick={clickToTest}>
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
          render={() => {
            return <Button type='link'>查看监测图片</Button>;
          }}
        />
      </Table>
    </div>
  );
};
