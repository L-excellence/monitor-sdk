import { ErrorLog } from "../interface";
import { formatStack } from "../utils";
import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";

export default function injectJSError() {
  // 1、监听全局未被 try/catch 捕获的错误
  window.addEventListener(
    "error",
    event => {
      console.log("js error event: ", event);
      console.log(event.error.stack);
      console.log(formatStack(event.error.stack));
      const lastEvent = getLastEvent(); // 监听到错误后，获取到最后一个交互事件

      // 1.1、数据建模存储
      const errorLog: ErrorLog = {
        // kind: "stability", // 监控指标的大类
        type: "error",
        errorType: "jsError",
        message: event.message,
        filename: event.filename,
        position: `${event.lineno}:${event.colno}`,
        stack: formatStack(event.error.stack),
        selector: lastEvent ? getSelector() : "",
      };
      console.log("js error log: ", errorLog);
      // console.log("selector: ", errorLog.selector);

      // 1.2、上报数据
    },
    // !!! 使用捕获
    true,
  );
}
