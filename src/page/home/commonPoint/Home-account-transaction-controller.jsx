import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import { CREATE_NEW_TRANSACTION, GET_MY_INFO } from '@/constants/api-constants';

// 样式
import { Button, Form, Input, Skeleton } from 'antd';
import { UserOutlined, DollarCircleOutlined } from '@ant-design/icons';
import '../../../style/home/commonPoint/home-transaction.styl';
const { TextArea } = Input;

export default (props) => {
  const { publicKey } = useSelector((state) => state.userStore),
    [accountAmount, setAccountAmount] = useState('0'),
    [transactionLoading, setTransactionLoading] = useState(false),
    [accountLoading, setAccountLoading] = useState(false),
    [isNeedRefresh, setIsNeedRefresh] = useState(true);

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setAccountLoading(true);

        const res = await proxyFetch(GET_MY_INFO, {}, 'GET');

        setAccountAmount(res.amount);
        setAccountLoading(false);
        setIsNeedRefresh(false);
      }
    })();
  }, [isNeedRefresh]);

  const onFinish = async (values) => {
    setTransactionLoading(true);
    values.from = publicKey;
    delete values.accountAmount;
    await proxyFetch(CREATE_NEW_TRANSACTION, values);
    setIsNeedRefresh(true);
    setTransactionLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='home-transaction-box'>
      <p className='title-box'>
        <span>交易</span>
      </p>
      <div className='transaction-content-box'>
        <div className='transaction-left-box'>
          <img
            src='/image/transaction.jpg'
            alt='交易图片图片'
            className='home-index-img'
          />
        </div>
        <div className='transaction-right-box'>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item label='账户余额' name='accountAmount'>
              <Skeleton loading={accountLoading}>{accountAmount}</Skeleton>
            </Form.Item>
            <Form.Item
              label='转出数量'
              name='amount'
              rules={[{ required: true, message: '请输入转出数量!' }]}
            >
              <Input
                prefix={
                  <DollarCircleOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='请输入转出数量'
              />
            </Form.Item>
            <Form.Item
              label='收益地址'
              name='to'
              rules={[{ required: true, message: '请输入收益地址!' }]}
            >
              <TextArea
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                rows={5}
                placeholder='请输入收益地址(收益人公钥)'
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
              }}
            >
              <div className='login-button-box'>
                <Button
                  size='large'
                  type='primary'
                  className='button'
                  htmlType='submit'
                  loading={transactionLoading}
                >
                  转出
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
