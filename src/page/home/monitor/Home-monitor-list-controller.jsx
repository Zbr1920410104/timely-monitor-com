// import React, { useState, useEffect } from 'react';

// // 请求
// import proxyFetch from '@/util/request';
// import {
//   GET_MONITOR_LIST,
//   GET_FILE_URL,
// } from '@/constants/api-constants';

// import { Table, Button } from 'antd';
// import '../../../style/home/monitor/monitor-list.styl';
// const { Column } = Table;


// export default (props) => {
//   const [monitorLoading, setMonitorLoading] = useState(false),
//     [monitorList, setMonitorList] = useState([]),
//     [isNeedRefresh, setIsNeedRefresh] = useState(true);

//   // 将已有的数据回显
//   useEffect(() => {
//     if (isNeedRefresh) {
//       (async () => {
//         setMonitorLoading(true);
//         const res = await proxyFetch(GET_MONITOR_LIST, {}, 'GET');
//         if (res) {
//           setMonitorList(res);
//         }
//         setMonitorLoading(false);
//       })();
//       setIsNeedRefresh(false);
//     }
//   }, [isNeedRefresh]);

//   const getFileUrl = async (url) => {
//     const res = await proxyFetch(GET_FILE_URL, { url }, 'GET');
//     window.open(res);
//   };

//   return (
//     <div className='home-monitor-list-box'>
//       <p className='title-box'>
//         <span>监控列表</span>
//       </p>
//       <div className='button-box'>
//       </div>
//       <Table
//         dataSource={monitorList}
//         className='table'
//         loading={monitorLoading}
//         rowKey={(record) => record.uuid}
//         scroll={{ x: 900 }}
//       >
//         <Column align='center' title='时间' dataIndex='time' key='' />
//         <Column
//           align='center'
//           title='用户名称'
//           dataIndex='consumerName'
//           key=''
//         />
//         <Column
//           align='center'
//           title='是否存在黑名单关键词'
//           dataIndex='isViolate'
//           key=''
//           render={(text, record) => {
//             return record.isViolate === 1
//               ? '存在'
//               : record.isViolate === 0
//               ? '不存在'
//               : '未检测';
//           }}
//         />
//         <Column
//           align='center'
//           title='查看原图'
//           dataIndex='originUrl'
//           key=''
//           render={(text, record) => {
//             return (
//               <Button
//                 type='link'
//                 onClick={() => {
//                   getFileUrl(text);
//                 }}
//               >
//                 查看原图
//               </Button>
//             );
//           }}
//         />
//         <Column
//           align='center'
//           title='查看监测图片'
//           dataIndex='newUrl'
//           key=''
//           render={(text, record) => {
//             return (
//               <Button
//                 type='link'
//                 onClick={() => {
//                   getFileUrl(text);
//                 }}
//               >
//                 查看监测图片
//               </Button>
//             );
//           }}
//         />
//       </Table>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_PICTURE } from '@/constants/api-constants';

import { Image, Skeleton } from 'antd';
import '../../../style/home/monitor/monitor-list.styl';

export default (props) => {
  const [needRefresh, setNeedRefresh] = useState(true),
    [pictureList, setPictureList] = useState([]),
    [loading, setLoading] = useState(false);

  // 将已有的数据回显
  useEffect(() => {
    if (needRefresh) {
      (async () => {
        setLoading(true);
        const res = await proxyFetch(
          GET_PICTURE,
          {
          },
          'GET'
        );
        if (res) {
          setPictureList(res);
        }
        setLoading(false);
      })();
      setNeedRefresh(false);
    }
  }, [needRefresh]);


  return (
    <Skeleton loading={loading}>
      <div className='home-monitor-list-box'>
        {pictureList
          ? pictureList.map((picture) => {
            return (
              <div className='picture-box' key={picture.uuid}>
                <span>{picture.consumerName}  {picture.time}</span>
                <Image
                  id={picture.uuid}
                  src={`/images/${picture.newUrl}`}
                  alt={picture.uuid}
                  className='image'
                />
              </div>
            );
          })
          : null}
      </div>
    </Skeleton>
  );
};