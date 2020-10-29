import React, { useState, useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { UPDATE_CONSUMER, SELECT_CONSUMER } from '@/constants/api-constants';

// 样式
import { Form, Input, Select, Button } from 'antd';
import '../../../style/modal/modal-modify.styl';
const { Option } = Select;

export default (props) => {
  const { consumerRefresh, consumerUuid } = useSelector(
      (state) => state.userStore
    ),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [needRefresh, setNeedRefresh] = useState(true),
    dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (!saveDataLoading && consumerUuid) {
      setSaveDataLoading(true);
      // 使用redux-saga
      values.uuid = consumerUuid;
      const res = await proxyFetch(UPDATE_CONSUMER, values);
      setSaveDataLoading(false);
      if (res) {
        form.resetFields();
        dispatch(userAction.setChangeConsumer(true));
        dispatch(userAction.setConsumerUuid(''));
      }
    }
  };

  useEffect(() => {
    if (consumerRefresh) {
      setNeedRefresh(true);
      dispatch(userAction.setConsumerRefresh(false));
    }
  }, [consumerRefresh, dispatch]);

  // 将已有的数据回显
  useEffect(() => {
    (async () => {
      if (needRefresh) {
        const userInfo = await proxyFetch(
          SELECT_CONSUMER,
          { uuid: consumerUuid },
          'GET'
        );
        // 数据回显
        if (userInfo) {
          // 数据处理
          userInfo.modifyUserName = userInfo.userName;
          form.setFieldsValue(userInfo);
        }
        setNeedRefresh(false);
      }
    })();
  }, [consumerUuid, needRefresh, form]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='inner-form-box'>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
        <Form.Item
          label='权限'
          name='role'
          rules={[{ required: true, message: '请选择权限!' }]}
        >
          <Select placeholder='选择权限'>
            <Option value={10} disabled={form.getFieldValue('role') !== 1}>
              普通用户
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='账号'
          name='modifyUserName'
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input placeholder='账号' />
        </Form.Item>
        <Form.Item>
          <div className='save-button-box'>
            <Button
              size='large'
              type='primary'
              className='button'
              htmlType='submit'
              loading={saveDataLoading}
            >
              保存
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
