export const getParams = url => {
  if (url.indexOf('?') != -1) {
    //判断是否有参数
    var str = url.substr(1)
    const strs = str.split('=')
    return strs[1]
  }
}
