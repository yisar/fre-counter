export class Vnode {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }

}


export function h(type, props, ...children) {
  return new Vnode(type, props, children)
}