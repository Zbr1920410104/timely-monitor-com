import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * 用户
 **/
export const GET_USER_TOKEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getUserToken`; // 登录
export const GET_USER_NAME = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getUserName`;
// 登录
export const GET_MY_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getMyInfo`;
export const SAVE_PASSWORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/savePassword`;
export const GET_ALL_USERS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getAllUsers`;

// 管理员
export const CREATE_ACCOUNT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/createAccount`;
export const UPDATE_ACCOUNT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/updateAccount`;
export const SELECT_ACCOUNT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/selectAccount`;
export const DELETE_ACCOUNT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/deleteAccount`;

// 监测员
export const SELECT_BLACK_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/selectBlackList`;
export const SAVE_BLACK_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/saveBlackList`;
export const GET_MONITOR_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/getMonitorList`;
export const GET_FILE_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/getFileUrl`;
export const GET_PICTURE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/getPicture`;
export const GET_ALL_CONSUMERS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/getAllConsumer`;
export const CREATE_CONSUMER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/createConsumer`;
export const UPDATE_CONSUMER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/updateConsumer`;
export const SELECT_CONSUMER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/selectConsumer`;
export const DELETE_CONSUMER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MONITOR}/deleteConsumer`;

// 普通员工
export const OCR_TEST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_CONSUMER}/ocrTest`;
