// xhr.js
// @ts-nocheck
import { ErrorLog } from "../interface";
import tracker from "../utils/tracker";

// 不需要监控的接口白名单
const whiteList = [
  "http://localhost:8080/send/monitor.gif", // 日志服务接口
];

// 增强 XHR：通过重写 XHR 主要方法，实现拦截和增强 XHR
export default function injectXHR() {
  const XMLHttpRequest = window.XMLHttpRequest;

  const oldSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  // 重写 open 方法增强功能 - 记录 request headers 数据
  XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
    this.requestHeaders[key] = value;
    return oldSetRequestHeader.apply(this, arguments);
  };

  const oldOpen = XMLHttpRequest.prototype.open; // 记录老的 open 方法
  // 重写 open 方法增强功能 - 记录请求方式和 url
  XMLHttpRequest.prototype.open = function (method, url, async) {
    // 跳过 白名单接口 防止出现死循环。
    if (whiteList.indexOf(url) === -1) {
      this.logData = { method, url, async }; // 存储数据
    }
    return oldOpen.apply(this, arguments);
  };

  const oldSend = XMLHttpRequest.prototype.send; // 记录老的 send 方法
  // 重写 send 方法增强功能 - 监控上报数据
  XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      // 在 send 发送之前，记录请求开始时间
      const startTime = Date.now();
      const handler = (type: "load" | "error") => {
        return () => {
          const duration = Date.now() - startTime; // 持续的时间
          const status = this.status; // 200 | 400 | 500
          const statusText = this.statusText; // OK | Server Error

          // TODO... 判断 status 仅处理错误状态

          const log: ErrorLog = {
            type: "error",
            errorType: "xhrError", // 错误类型是 xhr
            message: status + "-" + statusText, // 错误信息
            xhrData: {
              eventType: type, // load | error | abort
              url: this.logData.url, // api 路径
              method: this.logData.method, // 请求方法
              header: this.requestHeaders, // 请求头
              params: body || "", // 请求参数
              duration, // 请求时长
              response: this.response ? JSON.stringify(this.response) : "", // 请求结果
            },
          };
          console.log("XHR log: ", log);
          tracker.send(log);
        };
      };
      // 服务端返回 status 为 500 也会进入 load，需要进一步判断 status
      this.addEventListener("load", handler("load"), false);
      this.addEventListener("error", handler("error"), false);
    }
    return oldSend.apply(this, arguments);
  };
}
