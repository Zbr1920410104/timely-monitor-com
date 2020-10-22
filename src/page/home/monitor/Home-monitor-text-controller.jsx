import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { SELECT_BLACK_LIST } from '@/constants/api-constants';

// redux
import { useDispatch, useSelector } from 'react-redux';
import userAction from '@/redux/action/user';

import ModifyBlackList from '@/components/home/monitor/Modify-black-list-controller.jsx';

import { Descriptions, Button, Modal } from 'antd';
import '../../../style/home/monitor/monitor-text.styl';
const { confirm } = Modal;

export default (props) => {
  const { blackListRefresh } = useSelector((state) => state.userStore),
    [blackList, setBlackList] = useState(''),
    [needRefresh, setNeedRefresh] = useState(true),
    [blackListVisible, setBlackListVisible] = useState(false),
    dispatch = useDispatch();

  // 将已有的数据回显
  useEffect(() => {
    if (needRefresh) {
      (async () => {
        const res = await proxyFetch(SELECT_BLACK_LIST, {}, 'GET');
        if (res) {
          let data = res.blackList?.split(';');
          setBlackList(data);
        }
      })();
      setNeedRefresh(false);
    }
  }, [needRefresh]);

  useEffect(() => {
    if (blackListRefresh) {
      setNeedRefresh(true);
      dispatch(userAction.setBlackListRefresh(false));
      setBlackListVisible(false);
    }
  }, [blackListRefresh, dispatch]);

  const showModifyBlackListModal = () => {
    setBlackListVisible(true);
  };

  const hideModifyBlackListModal = () => {
    setBlackListVisible(false);
  };
  return (
    <div className='home-monitor-text-box'>
      <p className='title-box'>
        <span>黑名单设置</span>
      </p>
      <Modal
        title='修改黑名单'
        visible={blackListVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开填写内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideModifyBlackListModal();
            },
            onCancel() {},
          });
        }}
        footer={null}
        okText='确定'
        cancelText='取消'
      >
        <ModifyBlackList />
      </Modal>
      <div className='description-box'>
        <Descriptions bordered size='default' layout='vertical'>
          <Descriptions.Item label='黑名单列表'>
            <div className='description-item-box'>
              {blackList
                ? blackList.map((item, index) => {
                    return (
                      <div className='item-text-box' key={index}>
                        {item}
                      </div>
                    );
                  })
                : null}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className='button-box'>
        <Button
          type='primary'
          onClick={showModifyBlackListModal}
          className='button'
          size='large'
        >
          编辑
        </Button>
      </div>
    </div>
  );
};
