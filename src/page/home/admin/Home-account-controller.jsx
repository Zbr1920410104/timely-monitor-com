import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_ALL_USERS, CREATE_NEW_ACCOUNT } from '@/constants/api-constants';

// 样式
import '@/style/home/admin/home-account.styl';
import { Table, Button } from 'antd';
const { Column } = Table;

export default (porps) => {
  const [accountLoading, setAccountLoading] = useState(false),
    [accountList, setAccountList] = useState([]),
    [isNeedRefresh, setIsNeedRefresh] = useState(true);

  useEffect(() => {
    let _isMounted = true;

    (async () => {
      if (isNeedRefresh) {
        setAccountLoading(true);

        const accountList = await proxyFetch(GET_ALL_USERS, {}, 'GET');

        if (_isMounted) {
          setAccountList(accountList);
          setIsNeedRefresh(false);
        }

        setAccountLoading(false);
      }
    })();
  }, [isNeedRefresh]);

  const expandedRowRender = (record) => {
    if (record?.publicKey)
      return (
        <div className='table-inner-info-box'>公钥: {record.publicKey}</div>
      );
    else {
      return <div></div>;
    }
  };

  const createKeyPair = async () => {
    const res = await proxyFetch(CREATE_NEW_ACCOUNT);
    if (res) {
      setIsNeedRefresh(true);
    }
  };

  return (
    <div className='home-account-box'>
      <p className='title-box'>
        <span>账号管理</span>
      </p>
      <div className='home-account-content-box'>
        <div className='list-title-box'>
          <Button
            className='button'
            type='primary'
            size='large'
            style={{ marginBottom: 16 }}
            onClick={createKeyPair}
          >
            新增ECC密钥对
          </Button>
        </div>
        <Table
          dataSource={accountList}
          className='table'
          loading={accountLoading}
          rowKey={(record) => record.uuid}
          scroll={{ x: 900 }}
          expandedRowRender={expandedRowRender}
        >
          <Column
            align='center'
            title='权限'
            dataIndex='role'
            key=''
            fixed='left'
            render={() => '普通节点'}
          />
          <Column
            align='center'
            title='公钥(前20位)'
            dataIndex='publicKey'
            key=''
            render={(text) => {
              return text.slice(0, 20);
            }}
          />
          <Column
            align='center'
            title='私钥(前20位)'
            dataIndex='privateKey'
            key=''
            render={(text) => {
              return text.slice(0, 20);
            }}
          />
        </Table>
      </div>
    </div>
  );
};
