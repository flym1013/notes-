export function formateTime () {
  let date = new Date()
  let seperator1 = '-'
  let seperator2 = ':'
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  let strHours = date.getHours()
  let strMin = date.getMinutes()
  let strSec = date.getSeconds()
  const formData = (str) => {
    if (str >= 1 && str <= 9) {
      str = '0' + str
    }
    return str
  }
  let currentdate = date.getFullYear() + seperator1 + formData(month) + seperator1 + formData(strDate) + '　' + formData(strHours) + seperator2 + formData(strMin) + seperator2 + formData(strSec)
  return currentdate
}

export function exporExcel (tableId) { }
