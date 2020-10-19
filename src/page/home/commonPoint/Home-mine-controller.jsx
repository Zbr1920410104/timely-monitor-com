import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_MY_INFO,
  MINE_TO_CREATE_NEW_BLOCK,
} from '@/constants/api-constants';

// 样式
import { Descriptions, Skeleton, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../../../style/home/commonPoint/mine.styl';
const { TextArea } = Input;

export default (props) => {
  const [accountLoading, setAccountLoading] = useState(false),
    [account, setAccount] = useState([]),
    [mineLoading, setMineLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setAccountLoading(true);

      const res = await proxyFetch(GET_MY_INFO, {}, 'GET');

      setAccount(res);

      setAccountLoading(false);
    })();
  }, []);

  const onFinish = async (values) => {
    setMineLoading(true);
    await proxyFetch(MINE_TO_CREATE_NEW_BLOCK, values);
    setMineLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='mine-box'>
      <p className='title-box'>
        <span>账户与挖矿</span>
      </p>
      <div className='mine-content-box'>
        <div className='mine-left-box'>
          <Skeleton loading={accountLoading}>
            <Descriptions title='账户信息' bordered>
              <Descriptions.Item label='公钥' span={3}>
                <div style={{ width: '500px' }}>{account.publicKey}</div>
              </Descriptions.Item>
              <Descriptions.Item label='私钥' span={3}>
                {account.privateKey}
              </Descriptions.Item>
              <Descriptions.Item label='账户余额'>
                {account.amount}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </div>
        <div className='mine-right-box'>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label='收益地址'
              name='publicKey'
              rules={[{ required: true, message: '请设置挖矿收益地址!' }]}
            >
              <TextArea
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                rows={6}
                placeholder='收益地址'
              />
            </Form.Item>
            <Form.Item>
              <div className='login-button-box'>
                <Button
                  size='large'
                  type='primary'
                  className='button'
                  htmlType='submit'
                  loading={mineLoading}
                >
                  开始挖矿
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
