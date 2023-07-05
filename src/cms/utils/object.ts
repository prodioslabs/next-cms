function isObject(obj: any): obj is object {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isPlainObject(obj: any): obj is object {
  if (isObject(obj) === false) return false

  // If has modified constructor
  const ctor = obj.constructor
  if (ctor === undefined) return true

  // If has modified prototype
  const prot = ctor.prototype
  if (isObject(prot) === false) return false

  // If constructor does not have an Object-specific method
  // eslint-disable-next-line no-prototype-builtins
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false
  }

  // Most likely a plain Object
  return true
}
