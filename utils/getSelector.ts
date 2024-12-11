// getSelector.ts 获取当前事件链路上的元素选择器
import { getLastEventPath } from "./getLastEvent";

function getSelectorByPath(path: any[]) {
  return path
    .reverse() // 翻转 Path 中的元素
    .filter(element => {
      // 过滤掉 window、document 和 html
      return element !== window && element !== document && element !== document.documentElement;
    })
    .map(element => {
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`; // 返回 标签名#id
      } else if (element.className && typeof element.className === "string") {
        return `${element.nodeName.toLowerCase()}#${element.className}`; // 返回 标签名.class
      } else {
        return element.nodeName.toLowerCase(); // 返回 标签名
      }
    })
    .join(" ");
}

export default function getSelector() {
  const path = getLastEventPath();
  if (Array.isArray(path)) {
    return getSelectorByPath(path);
  }
}
