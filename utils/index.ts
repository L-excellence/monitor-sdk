/**
 * 格式化 error stack 栈错误信息
 */
export function formatStack(stack: string) {
  // -------- 原 stack：
  // TypeError: Cannot set properties of undefined (setting 'error')
  //   at errorClick (http://localhost:8080/:23:30)
  //   at HTMLInputElement.onclick (http://localhost:8080/:11:70)
  // -------- 格式化为：
  //   errorClick (http://localhost:8080/:23:30)
  //   HTMLInputElement.onclick (http://localhost:8080/:11:70)
  return stack
    .split("\n")
    .slice(1)
    .map(item => item.replace(/^\s+at\s+/g, ""))
    .join("\n");
}
