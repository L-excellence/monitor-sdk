import { MonitorLog, MonitorTypeLog } from "../interface";
import getLogBaseData from "./getLogBaseData";

class Tracker {
  url: string;

  constructor() {
    // 上报日志服务器地址（服务器上的 gif 图片）
    this.url = "http://localhost:8080/send/monitor.gif";
  }

  send(data: MonitorTypeLog) {
    // 获取基础日志数据
    const baseData = getLogBaseData();
    const log: MonitorLog = {
      baseLog: baseData,
      ...data,
    };
    console.log("send log", log);

    // 进行数据上报
    const img = new window.Image();
    img.src = `${this.url}?data=${encodeURIComponent(JSON.stringify(log))}`;
  }
}

export default new Tracker();
