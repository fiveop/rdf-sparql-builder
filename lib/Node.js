import clone from 'lodash/clone.js'
import space from './utils/space.js'

class Node {
  constructor ({ type, attr = {}, children = [] } = {}) {
    this.type = type
    this.attr = attr
    this.children = children
  }

  clone (callback) {
    const copy = new this.constructor()

    copy.type = this.type
    copy.attr = clone(this.attr)
    copy.children = this.children.map(child => typeof child.clone === 'function' ? child.clone() : child)

    if (callback) {
      callback(copy)
    }

    return copy
  }

  toStringStart () {
    return null
  }

  toStringChildren ({ multiline = false, indent = false } = {}) {
    const separator = multiline ? '\n' : ' '

    let str = this.children.map(child => child.toString()).filter(Boolean).join(separator)

    if (indent) {
      str = str.split('\n').map(line => space(2) + line).join('\n')
    }

    return str
  }

  toStringEnd () {
    return null
  }

  toString ({ multiline = false } = {}) {
    const separator = multiline ? '\n' : ' '

    return [
      this.toStringStart(),
      this.toStringChildren(),
      this.toStringEnd()
    ].filter(Boolean).join(separator)
  }
}

export default Node
