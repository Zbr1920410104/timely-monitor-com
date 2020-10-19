import React from 'react';

import { Table, Button } from 'antd';
const { Column } = Table;

export default (props) => {
  const accountList = [
    {
      uuid: '1213241',
      time: '2020-10-19 10:20:00',
      isViolate: true,
      originUrl: '',
      newUrl: '',
    },
    {
      uuid: '1213242',
      time: '2020-10-19 11:20:00',
      isViolate: true,
      originUrl: '',
      newUrl: '',
    },
    {
      uuid: '1213243',
      time: '2020-10-19 12:20:00',
      isViolate: false,
      originUrl: '',
      newUrl: '',
    },
    {
      uuid: '1213244',
      time: '2020-10-19 13:20:00',
      isViolate: true,
      originUrl: '',
      newUrl: '',
    },
    {
      uuid: '1213245',
      time: '2020-10-19 14:20:00',
      isViolate: false,
      originUrl: '',
      newUrl: '',
    },
  ];
  return (
    <div className='home-monitor-list-box'>
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
            console.log(record);
            return record.isViolate ? '存在' : '不存在';
          }}
        />
        <Column
          align='center'
          title='查看原图'
          dataIndex='originUrl'
          key=''
          render={() => {
            return <Button type='link'>查看原图</Button>;
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
