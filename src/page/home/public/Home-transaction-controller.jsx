import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_ALL_TRANSACTIONS } from '@/constants/api-constants';

// 样式
import '@/style/home/admin/home-block.styl';
import { Table } from 'antd';
const { Column } = Table;

export default (porps) => {
  const [transactionLoading, setTransactionLoading] = useState(false),
    [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    (async () => {
      setTransactionLoading(true);

      const res = await proxyFetch(GET_ALL_TRANSACTIONS, {}, 'GET');
      if (res) {
        setTransactionList(res);
      }
      setTransactionLoading(false);
    })();
  }, []);

  const expandedRowRender = (record) => {
    return (
      <div className='table-inner-info-box'>
        <span>发送方地址: {record.from ? record.from : 'null   '}</span>
        <span>接收方地址: {record.to}</span>
      </div>
    );
  };

  return (
    <div className='home-block-box'>
      <p className='title-box'>
        <span>交易查看</span>
      </p>
      <div className='home-block-content-box'>
        <Table
          dataSource={transactionList}
          className='table'
          rowKey={(record) => record.id}
          loading={transactionLoading}
          scroll={{ x: 900 }}
          expandedRowRender={expandedRowRender}
        >
          <Column align='center' title='序号' dataIndex='id' key='' />
          <Column
            align='center'
            title='发送方地址(前20位)'
            dataIndex='from'
            key=''
            render={(text) => {
              if (text) return text.slice(0, 20);
              else return 'null';
            }}
            width={200}
          />
          <Column
            align='center'
            title='接收方地址(前20位)'
            dataIndex='to'
            key=''
            render={(text) => {
              if (text) return text.slice(0, 20);
              else return 'null';
            }}
          />
          <Column align='center' title='数额' dataIndex='amount' key='' />
          <Column
            align='center'
            title='是否入链'
            dataIndex='isInChain'
            key=''
            render={(text) => {
              return text === 1 ? '是' : '否';
            }}
          />
        </Table>
      </div>
    </div>
  );
};
