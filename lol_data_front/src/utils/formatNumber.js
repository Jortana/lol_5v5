export const formatNum = (num) => {
  //1. 可能是字符串，转换为浮点数
  //2. 乘以100 小数点向右移动两位
  //3. Math.round 进行四舍五入
  //4. 除以100 小数点向左移动两位 实现保留小数点后两位
  let value = Math.round(parseFloat(num) * 100) / 100
  // 去掉小数点 存为数组
  let arrayNum = value.toString().split('.')
  //只有一位（整数）
  if (arrayNum.length === 1) {
    return value + '.00'
  }
  if (arrayNum.length > 1) {
    //小数点右侧 如果小于两位 则补一个0
    if (arrayNum[1].length < 2) {
      return value.toString() + '0'
    }
    return value
  }
}
