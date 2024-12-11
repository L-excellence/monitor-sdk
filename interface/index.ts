// 错误日志
export interface ErrorLog {
  // type 监控类型：error（代码错误）
  type: "error";
  // 错误类型：jsError（JS 代码错误）
  errorType: "jsError";
  // 错误信息
  message: string;
  // 错误发生的文件
  filename: string;
  // 错误发生的行列信息
  position: string;
  // 错误堆栈信息
  stack: string;
  // 错误发生在 DOM 到顶层元素的链路信息（使用选择器表示，如：body div#container input）
  selector?: string;
}

// 基础日志
export interface BaseLog {
  // 网页标题
  title: string;
  // 网页地址
  url: string;
  // 环境
  environment: string;
  // 用户环境完整信息
  userAgent: string;
  // 浏览器
  browser: string;
  // 设备
  device: string;
  // 操作系统
  os: string;
}

// 监控种类日志
export type MonitorTypeLog = ErrorLog;

// 上报监控日志
export type MonitorLog = { baseLog: BaseLog } & MonitorTypeLog;
