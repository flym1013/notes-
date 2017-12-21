export function formateTime (time) {
  return time.getFullYear() + '年' + time.getMonth() + 1 + '月' + time.getDate() + '日' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
}
