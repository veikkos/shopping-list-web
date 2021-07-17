export const objectToUniqueSortedArray = obj => Object.keys(obj).map(key => obj[key])
  .filter((elem, index, self) => index === self.indexOf(elem))
  .sort()

export const arrayToObjectByKey = (ar, key) => ar.reduce((acc, item) => {
  acc[item.id] = item[key]
  return acc
}, {})
