import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_ALL_USERS, DELETE_ACCOUNT } from '@/constants/api-constants';

// redux
import { useDispatch, useSelector } from 'react-redux';
import userAction from '@/redux/action/user';

// 组件
import ModifyAccountContent from '@/components/home/admin/Modify-account-content-controller.jsx';
import CreateAccountContent from '@/components/home/admin/Create-account-content-controller.jsx';

// 样式
import '@/style/home/admin/home-account.styl';
import { Table, Button, Modal } from 'antd';
const { Column } = Table,
  { confirm } = Modal;

export default (porps) => {
  const { changeAccount } = useSelector((state) => state.userStore),
    [accountLoading, setAccountLoading] = useState(false),
    [accountList, setAccountList] = useState([]),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [newAccountVisible, setNewAccountVisible] = useState(false),
    [modifyAccountVisible, setModifyAccountVisible] = useState(false),
    dispatch = useDispatch();

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

  useEffect(() => {
    if (changeAccount) {
      dispatch(userAction.setChangeAccount(false));
      setIsNeedRefresh(true);
      setNewAccountVisible(false);
      setModifyAccountVisible(false);
    }
  }, [changeAccount, dispatch]);

  const showNewAccountModal = () => {
    setNewAccountVisible(true);
  };

  const hideNewAccountModal = () => {
    setNewAccountVisible(false);
  };

  const showModifyAccountModal = (uuid) => {
    dispatch(userAction.setAccountUuid(uuid));
    dispatch(userAction.setAccountRefresh(true));
    setModifyAccountVisible(true);
  };

  const hideModifyAccountModal = () => {
    dispatch(userAction.setAccountUuid(''));
    setModifyAccountVisible(false);
  };

  const handleDelete = async (uuid) => {
    const res = await proxyFetch(DELETE_ACCOUNT, { uuid }, 'POST');
    if (res) {
      dispatch(userAction.setChangeAccount(true));
    }
  };

  return (
    <div className='home-account-box'>
      <p className='title-box'>
        <span>账号管理</span>
      </p>
      <div className='home-account-content-box'>
        <Modal
          title='新增账号'
          visible={newAccountVisible}
          onCancel={() => {
            confirm({
              title: '确认离开?',
              okType: 'primary',
              content: '离开填写内容将不会保存!',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                hideNewAccountModal();
              },
              onCancel() {},
            });
          }}
          footer={null}
          okText='确定'
          cancelText='取消'
        >
          <CreateAccountContent />
        </Modal>
        <Modal
          title='修改账号'
          visible={modifyAccountVisible}
          footer={null}
          onCancel={() => {
            confirm({
              title: '确认离开?',
              okType: 'primary',
              content: '离开修改内容将不会保存!',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                hideModifyAccountModal();
              },
              onCancel() {},
            });
          }}
          okText='确定'
          cancelText='取消'
        >
          <ModifyAccountContent />
        </Modal>
        <div className='list-title-box'>
          <Button
            className='button'
            type='primary'
            size='large'
            style={{ marginBottom: 16 }}
            onClick={showNewAccountModal}
          >
            新增账户
          </Button>
        </div>
        <Table
          dataSource={accountList}
          className='table'
          loading={accountLoading}
          rowKey={(record) => record.uuid}
          scroll={{ x: 900 }}
        >
          <Column
            align='center'
            title='权限'
            dataIndex='role'
            key=''
            fixed='left'
            render={(text) => {
              return text === 1 ? '超级管理员' : '监测员';
            }}
          />
          <Column align='center' title='账户' dataIndex='userName' key='' />
          <Column
            align='center'
            title='修改信息'
            dataIndex=''
            key=''
            render={(text, record) => {
              return (
                <Button
                  type='link'
                  onClick={() => {
                    showModifyAccountModal(record.uuid);
                  }}
                >
                  修改信息
                </Button>
              );
            }}
          />
          <Column
            align='center'
            title='删除账户'
            dataIndex=''
            key=''
            render={(text, record) => {
              return (
                <Button
                  type='link'
                  onClick={() => {
                    confirm({
                      title: '删除用户?',
                      okType: 'primary',
                      content: '确认要删除用户?',
                      okText: '确认',
                      cancelText: '取消',
                      onOk() {
                        handleDelete(record.uuid);
                      },
                      onCancel() {},
                    });
                  }}
                >
                  删除账户
                </Button>
              );
            }}
          />
        </Table>
      </div>
    </div>
  );
};
