const arrayEqual = (arr1, arr2) => {
  const strArr1 = arr1.map((item) => item.toString())
  const strArr2 = arr2.map((item) => item.toString())
  strArr1.sort((a, b) => a.localeCompare(b))
  strArr2.sort((a, b) => a.localeCompare(b))

  for (let i = 0; i < strArr1.length; i += 1) {
    if (strArr1[i] !== strArr2[i]) {
      return false
    }
  }

  return true
}

module.exports = arrayEqual
