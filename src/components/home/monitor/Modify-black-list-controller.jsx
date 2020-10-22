import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { SELECT_BLACK_LIST, SAVE_BLACK_LIST } from '@/constants/api-constants';

// redux
import { useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import { Form, Input, Button, Alert, Skeleton } from 'antd';
import '../../../style/home/monitor/modify-black-list.styl';
const { TextArea } = Input;

export default (props) => {
  const [blackList, setBlackList] = useState(''),
    [saveLoading, setSaveLoading] = useState(),
    [getDataLoading, setGetDataLoading] = useState(false),
    dispatch = useDispatch();

  // 将已有的数据回显
  useEffect(() => {
    (async () => {
      setGetDataLoading(true);
      const res = await proxyFetch(SELECT_BLACK_LIST, {}, 'GET');
      if (res) {
        setBlackList(res.blackList);
      }
      setGetDataLoading(false);
    })();
  }, []);

  const onFinish = async (values) => {
    setSaveLoading(true);
    const res = await proxyFetch(SAVE_BLACK_LIST, values);
    if (res) {
      dispatch(userAction.setBlackListRefresh(true));
    }
    setSaveLoading(false);
  };
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <div className='black-list-modal-box'>
      <Alert
        message='填写须知'
        description='请以英文分号";"分隔每个黑名单'
        className='alert-box'
        type='info'
        showIcon
      />
      <Skeleton loading={getDataLoading}>
        <Form onFinish={onFinish} {...layout} className='form-box'>
          <Form.Item
            label='黑名单'
            name='blackList'
            rules={[{ required: true, message: '请输入黑名单!' }]}
            initialValue={blackList}
            // initialValue='因为;所以;但是;然而;否则'
          >
            <TextArea rows={8} placeholder='黑名单' />
          </Form.Item>
          <Form.Item>
            <Button
              size='large'
              type='primary'
              className='button'
              htmlType='submit'
              loading={saveLoading}
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </div>
  );
};
