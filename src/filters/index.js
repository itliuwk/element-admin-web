const moment = require('moment');

// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
export function parseint(num) {
  return parseInt(num)
}
export function dateTimeFormate(date) {
  if (!date) return ""
  return moment(date).format('YYYY-MM-DD HH:mm:SS')
}

export function dateTimeFormateHHmm(date) {
  if (!date) return ""
  return moment(date).format('YYYY-MM-DD HH:mm:ss')

}


export function FormateYYMMDD(date) {
  if(!date){
    return ""
  }
  return moment(date).format('YYYY-MM-DD')

}


export function clone(valu) {
  return JSON.parse(JSON.stringify(valu))
}
export function toFixed(value) {
  if (!value) { return value }
  return value.toFixed(2)
}

export function array2string(array) {
  if (!array) { return "" }
  return array.toString()
}

// x:y => x+1:y+1 货道号
export function showShelfNumber(valu) {
  if (!valu) return ""
  var array = valu.split(":")
  return `${parseInt(array[0]) + 1}${parseInt(array[1]) + 1}`
}
