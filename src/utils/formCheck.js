/**
 * des : 过滤特殊字符
 * @param s 目标参数
 * @returns {string}
 */
export function stripscript(s) {
  const pattern = new RegExp('[`~!@#$^&*()=|{}\':%\'\\[\\]<>/?~～！@#￥……&*¥（）_ -- ——|{}【】‘：”“\'。、？]')
  let rs = ''
  for (let i = 0; i < s.length; i++) {
    rs += s.substr(i, 1)
      .replace(pattern, '')
  }
  return rs
}
export function NoNumber(str) {
  let rs = ''
  for (let i = 0; i < str.length; i++) {
    rs += str.substr(i, 1)
      .replace(/\D/, '')
  }
  return rs
}

/**
 * des : 过滤表情
 * @param name
 * @returns {*}
 */
export function filterEmoji(name) {
  const str = name.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, '')
  return str
}

/**
 *
 * @param str
 * @returns {*}
 */
export function tTrim(str) {
  return str.replace(/^\s+|\s+$/gm, '')
}

export function strFilter(str) {
  str = tTrim(str)
  str = filterEmoji(str)
  str = stripscript(str)
  str = NoNumber(str)
  return str
}

