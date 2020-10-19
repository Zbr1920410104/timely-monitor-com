import React, { useEffect } from 'react';

// redux
import userAction from '@/redux/action/user';
import { useSelector, useDispatch } from 'react-redux';

// 路由
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// controller
import HomeIndexController from '@/page/home/Home-index-controller.jsx';
import PasswordModifyController from '@/page/home/admin/Password-modify-controller.jsx';
import HomeTransactionController from '@/page/home/public/Home-transaction-controller.jsx';
import HomeBlockController from '@/page/home/public/Home-block-controller.jsx';
import HomeAccountController from '@/page/home/admin/Home-account-controller.jsx';
import HomeMineController from '@/page/home/commonPoint/Home-mine-controller.jsx';
import HomeAccountTransactionController from '@/page/home/commonPoint/Home-account-transaction-controller.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// components
import Nav from '@/components/home/Nav.jsx';

// 样式
import '@/style/home/home.styl';
import { Layout, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default (props) => {
  const token = localStorage.getItem(`${LOCAL_STORAGE}-token`);
  // 各个路由控制
  const { uuid, name, role } = useSelector((state) => state.userStore),
    history = useHistory(),
    dispatch = useDispatch();

  // 如果没有token就跳到首页
  useEffect(() => {
    if (!token) {
      history.push(ROUTES.INDEX.path);
    }
  }, [token, history]);

  // 刷新页面会导致uuid消失,需要用token再请求一遍
  useEffect(() => {
    if (!uuid && token) {
      // 由token获取manager信息
      dispatch(userAction.asyncSetUserByToken(token));
    }
  }, [uuid, token, dispatch]);

  const homeIndex = useRouteMatch({
    path: ROUTES.HOME_INDEX.path,
    exact: true,
  });

  // 管理员
  const homeTransaction = useRouteMatch({
    path: ROUTES.HOME_TRANSACTION.path,
    exact: true,
  });
  const homeBlock = useRouteMatch({
    path: ROUTES.HOME_BLOCK.path,
    exact: true,
  });
  const homeAccount = useRouteMatch({
    path: ROUTES.HOME_ACCOUNT.path,
    exact: true,
  });
  const homePassword = useRouteMatch({
    path: ROUTES.HOME_PASSWORD.path,
    exact: true,
  });
  const homeMine = useRouteMatch({
    path: ROUTES.HOME_MINE.path,
    exact: true,
  });
  const homeAccountTransaction = useRouteMatch({
    path: ROUTES.HOME_ACCOUNT_TRANSACTION.path,
    exact: true,
  });

  const roleToText = (role) => {
    switch (role) {
      case 1:
        return '超级管理员';
      case 5:
        return '普通节点';
      default:
        return '未知';
    }
  };

  let content = null;

  if (homeIndex) {
    // 主首页
    content = <HomeIndexController />;
  } else if (homePassword) {
    content = <PasswordModifyController />;
  } else if (homeTransaction) {
    content = <HomeTransactionController />;
  } else if (homeBlock) {
    content = <HomeBlockController />;
  } else if (homeAccount) {
    content = <HomeAccountController />;
  } else if (homeMine) {
    content = <HomeMineController />;
  } else if (homeAccountTransaction) {
    content = <HomeAccountTransactionController />;
  }

  return (
    <Layout>
      <Sider className='home-sider'>
        <div className='logo'>
          <Icon type='reconciliation' />
          <span>BrCoin账户系统</span>
        </div>
        <div className='user-info'>
          <span>
            欢迎:{name}({roleToText(role)})
          </span>
        </div>
        <Nav />
      </Sider>
      <Layout className='home-content'>
        <Header className='home-header'>
          <div className='exit-box'>
            <Button
              type='link'
              className='exit-button'
              onClick={() => {
                history.push(ROUTES.INDEX.path);
                localStorage.removeItem(`${LOCAL_STORAGE}-token`);
              }}
            >
              [退出登录]
            </Button>
          </div>
        </Header>
        <Content className='content-box'>
          <div className='content-inner-box'>{content}</div>
        </Content>
        <Footer className='home-footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
