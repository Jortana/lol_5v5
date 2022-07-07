export const standardScore = (scores, digit = 2) => {
  // 浮点数精度误差问题
  const formulaCalc = (formula, digit) => {
    let pow = Math.pow(10, digit)
    return Math.round(formula * pow, 10) / pow
  }

  const length = scores.length
  const sum = (a, b) => formulaCalc(a + b, digit)
  // 平均值
  const avg = scores.reduce(sum) / length
  // 偏差
  const deviations = scores.map((score) => {
    return score - avg
  })

  // 计算标准差
  // 所有数减去其平均值的平方和，再除以数组个数，再把所得值开根号
  const stdDev = Math.sqrt(deviations.map((n) => n * n).reduce(sum) / length)

  // 计算标准分数
  scores = scores.map((score) => {
    return formulaCalc((score - avg) / stdDev, digit)
  })
  return scores
}
