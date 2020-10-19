import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_ALL_BLOCKS,
  CREATE_GENESIS_BLOCK,
  GET_DIFFICULTY,
} from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import '@/style/home/admin/home-block.styl';
import { Table, Button, Select, Skeleton } from 'antd';
const { Column } = Table,
  { Option } = Select;

export default (porps) => {
  const [blockLoading, setBlockLoading] = useState(false),
    [blockList, setBlockList] = useState([]),
    [difficulty, setDifficulty] = useState(1),
    [isNeedRefresh, setIsNeedRefresh] = useState(true);
  const { role } = useSelector((state) => state.userStore);

  useEffect(() => {
    if (isNeedRefresh) {
      (async () => {
        setBlockLoading(true);

        const res = await proxyFetch(GET_ALL_BLOCKS, {}, 'GET');
        if (res) {
          const blockList = res.map((block) => {
            return {
              ...block,
              transactions: JSON.parse(block.transactions),
            };
          });

          setBlockList(blockList);
          const difficulty = await proxyFetch(GET_DIFFICULTY, {}, 'GET');
          if (difficulty?.difficulty) {
            setDifficulty(difficulty.difficulty);
          }
        }
        setBlockLoading(false);
        setIsNeedRefresh(false);
      })();
    }
  }, [isNeedRefresh]);

  const expandedRowRender = (record) => {
    if (record && record.transactions)
      return (
        <div className='table-inner-info-box'>
          {record.transactions.map((item, index) => {
            return (
              <div key={index}>
                交易{index + 1}: 发送方地址: {item.from ? item.from : 'null'}{' '}
                接收方地址: {item.to}
                金额: {item.amount}
              </div>
            );
          })}
        </div>
      );
    else {
      return <div></div>;
    }
  };

  const createGenesisBlock = async () => {
    await proxyFetch(CREATE_GENESIS_BLOCK, { difficulty }, 'POST');
    // 一秒后响应
    setTimeout(() => {
      setIsNeedRefresh(true);
    }, 1000);
  };

  return (
    <div className='home-block-box'>
      <p className='title-box'>
        <span>区块查看</span>
      </p>
      <div className='home-block-content-box'>
        <div className='list-title-box'>
          <Skeleton loading={blockLoading}>
            {'挖矿难度：   '}
            <Select
              placeholder='分类查看'
              className='select'
              disabled={role !== 1}
              defaultValue={difficulty}
              onChange={(e) => {
                setDifficulty(e);
              }}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6</Option>
              <Option value={7}>7</Option>
              <Option value={8}>8</Option>
              <Option value={9}>9</Option>
              <Option value={10}>10</Option>
            </Select>
          </Skeleton>
          <Button
            onClick={createGenesisBlock}
            className={role === 1 ? 'button' : ''}
            type='primary'
            size='large'
            disabled={role !== 1}
          >
            创建原始区块
          </Button>
        </div>
        <Table
          dataSource={blockList}
          className='table'
          rowKey={(record) => record.index}
          expandedRowRender={(record) => expandedRowRender(record)}
          loading={blockLoading}
          scroll={{ x: 900 }}
        >
          <Column align='center' title='序号' dataIndex='index' key='' />
          <Column
            align='center'
            title='父区块哈希'
            dataIndex='previousHash'
            key=''
          />
          <Column align='center' title='时间戳' dataIndex='timestamp' key='' />
          <Column align='center' title='Nonce' dataIndex='nonce' key='' />
          <Column align='center' title='区块哈希' dataIndex='hash' key='' />
        </Table>
      </div>
    </div>
  );
};
