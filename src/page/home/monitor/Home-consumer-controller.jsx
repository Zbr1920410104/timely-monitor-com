import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_ALL_CONSUMERS, DELETE_CONSUMER } from '@/constants/api-constants';

// redux
import { useDispatch, useSelector } from 'react-redux';
import userAction from '@/redux/action/user';

// 组件
import ModifyConsumerContent from '@/components/home/monitor/Modify-consumer-content-controller.jsx';
import CreateConsumerContent from '@/components/home/monitor/Create-consumer-content-controller.jsx';

// 样式
import '@/style/home/monitor/home-consumer.styl';
import { Table, Button, Modal } from 'antd';
const { Column } = Table,
  { confirm } = Modal;

export default (porps) => {
  const { changeConsumer } = useSelector((state) => state.userStore),
    [consumerLoading, setConsumerLoading] = useState(false),
    [consumerList, setConsumerList] = useState([]),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [newConsumerVisible, setNewConsumerVisible] = useState(false),
    [modifyConsumerVisible, setModifyConsumerVisible] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    let _isMounted = true;

    (async () => {
      if (isNeedRefresh) {
        setConsumerLoading(true);

        const consumerList = await proxyFetch(GET_ALL_CONSUMERS, {}, 'GET');

        if (_isMounted) {
          setConsumerList(consumerList);
          setIsNeedRefresh(false);
        }

        setConsumerLoading(false);
      }
    })();
  }, [isNeedRefresh]);

  useEffect(() => {
    if (changeConsumer) {
      dispatch(userAction.setChangeConsumer(false));
      setIsNeedRefresh(true);
      setNewConsumerVisible(false);
      setModifyConsumerVisible(false);
    }
  }, [changeConsumer, dispatch]);

  const showNewConsumerModal = () => {
    setNewConsumerVisible(true);
  };

  const hideNewConsumerModal = () => {
    setNewConsumerVisible(false);
  };

  const showModifyConsumerModal = (uuid) => {
    dispatch(userAction.setConsumerUuid(uuid));
    dispatch(userAction.setConsumerRefresh(true));
    setModifyConsumerVisible(true);
  };

  const hideModifyConsumerModal = () => {
    dispatch(userAction.setConsumerUuid(''));
    setModifyConsumerVisible(false);
  };

  const handleDelete = async (uuid) => {
    const res = await proxyFetch(DELETE_CONSUMER, { uuid }, 'POST');
    if (res) {
      dispatch(userAction.setChangeConsumer(true));
    }
  };

  return (
    <div className='home-consumer-box'>
      <p className='title-box'>
        <span>账号管理</span>
      </p>
      <div className='home-consumer-content-box'>
        <Modal
          title='新增账号'
          visible={newConsumerVisible}
          onCancel={() => {
            confirm({
              title: '确认离开?',
              okType: 'primary',
              content: '离开填写内容将不会保存!',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                hideNewConsumerModal();
              },
              onCancel() {},
            });
          }}
          footer={null}
          okText='确定'
          cancelText='取消'
        >
          <CreateConsumerContent />
        </Modal>
        <Modal
          title='修改账号'
          visible={modifyConsumerVisible}
          footer={null}
          onCancel={() => {
            confirm({
              title: '确认离开?',
              okType: 'primary',
              content: '离开修改内容将不会保存!',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                hideModifyConsumerModal();
              },
              onCancel() {},
            });
          }}
          okText='确定'
          cancelText='取消'
        >
          <ModifyConsumerContent />
        </Modal>
        <div className='list-title-box'>
          <Button
            className='button'
            type='primary'
            size='large'
            style={{ marginBottom: 16 }}
            onClick={showNewConsumerModal}
          >
            新增账户
          </Button>
        </div>
        <Table
          dataSource={consumerList}
          className='table'
          loading={consumerLoading}
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
              return text === 10 ? '普通用户' : '未知';
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
                    showModifyConsumerModal(record.uuid);
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
