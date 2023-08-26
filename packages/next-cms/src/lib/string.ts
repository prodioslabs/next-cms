export function pascalCase(str: string) {
  return str.replace(/(^\w|[-_ ]+\w)/g, function (match) {
    return match.charAt(match.length - 1).toUpperCase()
  })
}
