import React, { useState, useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { UPDATE_ACCOUNT, SELECT_ACCOUNT } from '@/constants/api-constants';

// 样式
import { Form, Input, Select, Button } from 'antd';
import '../../../style/modal/modal-modify.styl';
const { Option } = Select;

export default (props) => {
  const { accountRefresh, accountUuid } = useSelector(
      (state) => state.userStore
    ),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [needRefresh, setNeedRefresh] = useState(true),
    dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (!saveDataLoading) {
      setSaveDataLoading(true);
      // 使用redux-saga
      const res = await proxyFetch(UPDATE_ACCOUNT, values);
      setSaveDataLoading(false);
      if (res) {
        form.resetFields();
        dispatch(userAction.setChangeAccount(true));
        dispatch(userAction.setAccountUuid(''));
      }
    }
  };

  useEffect(() => {
    if (accountRefresh) {
      setNeedRefresh(true);
      dispatch(userAction.setAccountRefresh(false));
    }
  }, [accountRefresh, dispatch, form]);

  // 将已有的数据回显
  useEffect(() => {
    (async () => {
      if (needRefresh) {
        const userInfo = await proxyFetch(
          SELECT_ACCOUNT,
          { uuid: accountUuid },
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
  }, [accountUuid, needRefresh, form]);

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
          <Select placeholder='监测员'>
            <Option value={5}>监测员</Option>
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
