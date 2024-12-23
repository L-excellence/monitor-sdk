// 错误日志
export interface ErrorLog {
  // type 监控类型：error（代码错误）
  type: "error";
  // 错误类型：jsError（JS 代码错误）、promiseError（Promise 错误）、loadResourceError（加载资源错误）、xhrError（API 请求错误）
  errorType: "jsError" | "promiseError" | "loadResourceError" | "xhrError";
  // 错误信息
  message: string;
  // 错误发生的文件
  filename?: string;
  // 错误发生的行列信息
  position?: string;
  // 错误堆栈信息
  stack?: string;
  // 错误发生在 DOM 到顶层元素的链路信息（使用选择器表示，如：body div#container input）
  selector?: string;
  // 资源标签名称
  tagName?: string;
  // xhr 数据
  xhrData?: {
    eventType: "load" | "error"; // xhr 错误事件类型
    url: string; // api 路径
    method: string; // 请求方式
    header: Record<string, unknown>; // 请求头
    params: string; // 请求参数
    duration: number; // 请求时长
    status: number; // 请求状态
    response: string; // 请求结果
  };
}

// 基础日志
export interface BaseLog {
  // 网页标题
  title: string;
  // 网页地址
  url: string;
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
